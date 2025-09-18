import type { UserSchema } from "@/entities/user";
import type { LoginFormSchema } from "@/features/login";
import type {
    EnhancedStore,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from "@reduxjs/toolkit";

export interface StateSchema {
  user: UserSchema;
  loginForm?: LoginFormSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManger {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  getMountedReducers: () => Partial<Record<StateSchemaKey, boolean>>;
  reduce: (
    state: StateSchema | undefined,
    action: UnknownAction
  ) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
    reducerManager: ReducerManger;
}
