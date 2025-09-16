import {
  configureStore,
  type ThunkDispatch,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { type StateSchema } from "./StateSchema";
import { userReducer } from "@/entities/user";
import { loginReducer } from "@/features/login";

export const createStore = (intialState: StateSchema) => {
  return configureStore<StateSchema>({
    preloadedState: intialState,
    reducer: {
      user: userReducer,
      loginForm: loginReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });
};

export type AppDispatch = ThunkDispatch<StateSchema, unknown, UnknownAction>;
