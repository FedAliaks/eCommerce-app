import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UpdateProfileSliceState = {
  newPassword: string;
  checkNewPassword: boolean;
  checkNewName: boolean;
};

const initialState: UpdateProfileSliceState = {
  newPassword: '',
  checkNewPassword: false,
  checkNewName: true,
};

export const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    setNewPassword(state, action: PayloadAction<string>) {
      state.newPassword = action.payload;
    },
    setCheckNewPassword(state, action: PayloadAction<boolean>) {
      state.checkNewPassword = action.payload;
    },
    setCheckNewName(state, action: PayloadAction<boolean>) {
      state.checkNewName = action.payload;
    },
  },
});

export const { reducer: updateProfileReducer, actions: updateProfileActions } = updateProfileSlice;
