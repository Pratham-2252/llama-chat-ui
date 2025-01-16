import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = TokenSlice.actions;

export const getAccessToken = (state) => state.token.accessToken;

export default TokenSlice.reducer;
