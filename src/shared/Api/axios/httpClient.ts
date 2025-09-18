import { API_URL, LOCAL_STORAGE_USER_KEY } from "@/shared/config";
import type {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type QueueCallback = (sucess: boolean, error?: AxiosError) => void;
interface RefreshError extends Error {
  isRefreshError: true;
  originalError: AxiosError;
}

export const httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

let isRefreshing = false;
const refreshQueue: QueueCallback[] = [];

const REFRESH_TIMEOUT = 15000;

const subscribeRefresh = (cb: QueueCallback) => {
  refreshQueue.push(cb);
};

const flushQueue = (error: AxiosError | null, sucess: boolean) => {
  while (refreshQueue.length) {
    const cb = refreshQueue.shift();
    if (cb) {
      cb(sucess, error || undefined);
    }
  }
};

const createRefreshError = (originalError: AxiosError): RefreshError => {
  const refreshError = new Error("Token refresh failed") as RefreshError;
  refreshError.isRefreshError = true;
  refreshError.originalError = originalError;
  return refreshError;
};

const isNetworkError = (error: AxiosError) => {
  return (
    !error.response &&
    (error.code === "ECONNABORTED" ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNRESET" ||
      error.message.includes("timeout"))
  );
};

const logError = (context: string, error: unknown) => {
  if (import.meta.env.DEV) {
    console.log(`HTTP CLIENT ${context}:`, error);
  }
};

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error?.response?.status;
    const originalConfig = error?.config as
      | ExtendedAxiosRequestConfig
      | undefined;
    logError("response interceptors", {
      status,
      url: originalConfig?.url,
      method: originalConfig?.method,
      message: error.message,
    });

    if (!originalConfig) {
      return Promise.reject(error);
    }

    if (status !== 401 || originalConfig?._retry) {
      Promise.reject(error);
    }
    if (originalConfig?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    originalConfig._retry = true;
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = await httpClient.post(
          "/auth/refresh",
          {},
          {
            timeout: REFRESH_TIMEOUT,
            transformRequest: [(data) => data],
          }
        );
        logError("sucess refresh", {
          status: refreshResponse.status,
        });
        isRefreshing = false;
        flushQueue(null, true);
        return httpClient(originalConfig);
      } catch (refreshError) {
        isRefreshing = false;
        const axiosRefreshError = refreshError as AxiosError;

        logError("resfresh failed", {
          status: axiosRefreshError?.response?.status,
          message: axiosRefreshError.message,
          isNetworkError: isNetworkError(axiosRefreshError),
        });
        try {
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        } catch (storageError) {
          logError("storage clear error", storageError);
        }
        if (authFailureHandler) {
          try {
            authFailureHandler(axiosRefreshError);
          } catch (handlerError) {
            logError("auth failure handler error:", handlerError);
          }
        }
        flushQueue(axiosRefreshError, false);

        return Promise.reject(createRefreshError(axiosRefreshError));
      }
    }
    return new Promise<AxiosResponse>((resolve, reject) => {
      subscribeRefresh((sucess: boolean, refreshError?: AxiosError) => {
        if (sucess) {
          httpClient(originalConfig).then(resolve).catch(reject);
        } else {
          const finalError = refreshError
            ? createRefreshError(refreshError)
            : error;
          reject(finalError);
        }
      });
    });
  }
);

type AuthFailureHandler = (error?: AxiosError) => void;
let authFailureHandler: AuthFailureHandler | null = null;

export const setAuthFailureHandler = (handler: AuthFailureHandler) => {
  authFailureHandler = handler;
};

export const isRefreshingError = (error: unknown): error is RefreshError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "isRefreshError" in error &&
    error.isRefreshError === true
  );
};
