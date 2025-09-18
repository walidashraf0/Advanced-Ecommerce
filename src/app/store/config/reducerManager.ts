import {
  combineReducers,
  type Reducer,
  type ReducersMapObject,
  type UnknownAction,
} from "@reduxjs/toolkit";
import type { ReducerManger, StateSchema, StateSchemaKey } from "./StateSchema";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManger {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers) as (
    state: StateSchema | undefined,
    action: UnknownAction
  ) => StateSchema;

  let keysToRemove: StateSchemaKey[] = [];

  const mountedReducers: Partial<Record<StateSchemaKey, boolean>> = {};

  return {
    getReducerMap: () => reducers,

    getMountedReducers: () => ({ ...mountedReducers }),

    reduce: (state: StateSchema | undefined, action: UnknownAction) => {
      let nextState = state as StateSchema | undefined;

      if (keysToRemove.length > 0 && nextState) {
        nextState = { ...state } as StateSchema;
        for (let key of keysToRemove) {
          delete nextState[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(nextState, action);
    },

    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer as Reducer;
      mountedReducers[key] = true;

      combinedReducer = combineReducers(reducers) as (
        tate: StateSchema | undefined,
        action: UnknownAction
      ) => StateSchema;
    },

    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        mountedReducers[key] = false;
        return;
      }

      delete reducers[key];
      mountedReducers[key] = false;

      keysToRemove.push(key);

      combinedReducer = combineReducers(reducers) as (
        tate: StateSchema | undefined,
        action: UnknownAction
      ) => StateSchema;
    },
  };
}
