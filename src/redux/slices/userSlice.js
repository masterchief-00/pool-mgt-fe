import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: "admin",
  },
  reducers: {
    setUserRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
