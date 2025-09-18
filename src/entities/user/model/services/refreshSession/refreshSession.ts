import { httpClient } from "@/shared/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../types/UserSchema";
import { LOCAL_STORAGE_USER_KEY } from "@/shared/config";
import { userActions } from "../../slice/userSlice";

export const refreshsession = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("user/refreshSession", async (_, thunkApi) => {
  try {
    const res = await httpClient.post<User>("/auth/refresh");
    const user = res.data;
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    thunkApi.dispatch(userActions.setUserData(user));
    return;
  } catch (error) {
    thunkApi.dispatch(userActions.clearUserData());
    thunkApi.rejectWithValue("refresh error");
  }
});
