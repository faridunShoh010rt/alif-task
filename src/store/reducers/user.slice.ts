import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/user.type";
import { userService } from "../../service/user.service";

interface IInitialState {
  users: IUser[];
  status: null | string;
  error: null | string;
}

const initialState: IInitialState = {
  users: [],
  status: null,
  error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", (portia: number) => {
  return userService.getUsers(portia);
});

export const createUsers = createAsyncThunk(
  "users/createUsers",
  (user: IUser) => {
    return userService.createUser(user);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = [...state.users, ...action.payload];
          state.status = "resolve";
        }
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        const user = action.payload;
        state.users = [user, ...state.users];
      });
  },
});

export default usersSlice.reducer;
