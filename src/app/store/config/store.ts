import {
  configureStore,
  type ThunkDispatch,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { type StateSchema } from "./StateSchema";

export const createStore = (intialState: StateSchema) => {
  return configureStore<StateSchema>({
    preloadedState: intialState,
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });
};

export type AppDispatch = ThunkDispatch<StateSchema, unknown, UnknownAction>;
