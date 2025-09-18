import { API_URL } from "./api/api";
import {
  AuthProviders,
  AuthMethod,
  type AuthMethodType,
  type AuthProvidersType,
  LOCAL_STORAGE_USER_KEY,
} from "./auth/auth";
import {
  languageIconList,
  type SupportedLngsType,
} from "./i18n/LanguageIconsList";
import { routePaths, AppRoutes } from "./router/routePath";
import {
  Theme,
  ThemeContext,
  LOCAL_STORAGE_THEME_KEY,
  type ThemeType,
} from "./theme/themeContext";
import { useTheme } from "./theme/useTheme";
export {
  routePaths,
  AppRoutes,
  Theme,
  ThemeContext,
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_USER_KEY,
  useTheme,
  languageIconList,
  AuthProviders,
  AuthMethod,
  API_URL,
  type ThemeType,
  type AuthMethodType,
  type SupportedLngsType,
  type AuthProvidersType,
};
