import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UpdateProfileSliceState = {
  newPassword: string;
  checkNewPassword: boolean;
  checkNewName: boolean;
  addressIdForChange: string;
};

const initialState: UpdateProfileSliceState = {
  newPassword: '',
  checkNewPassword: false,
  checkNewName: true,
  addressIdForChange: '',
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
    setAddressIdForChange(state, action: PayloadAction<string>) {
      state.addressIdForChange = action.payload;
    },
  },
});

export const { reducer: updateProfileReducer, actions: updateProfileActions } = updateProfileSlice;
