import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserToLocalStorage,
} from '../../utils/localStorage';
import { IUser } from '../../types/user.interface';

interface IUserState {
  isLoading: boolean;
  isRemember?: boolean;
  user: IUser | null;
}

const initialState: IUserState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: IUser, thunkApi) => {
    try {
      const res = await axios.post('https://reqres.in/api/login', user);
      return user;
    } catch (error) {
      let message;
      if (error instanceof AxiosError) message = error.response?.data.error;
      else message = String(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserToLocalStorage();
      if (payload && payload !== '') {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
        if (payload.isRemember) {
          addUserToLocalStorage(payload);
        }
        toast.success(`Welcome`);
      }
    );
    builder.addCase(
      loginUser.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
