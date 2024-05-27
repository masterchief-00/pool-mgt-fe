import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const SERVER_URL = "http://localhost:3000";

export const operatorsAvailable = createAsyncThunk(
  "operators/location",
  async (location) => {
    try {
      const tokenStr = localStorage.getItem("token");
      let str = location.trim();
      const locParam = str.replace(" ", "&");

      const response = await axios({
        method: "get",
        url: `${SERVER_URL}/users/operators/${locParam}`,
        headers: { Authorization: `Bearer ${tokenStr}` },
      });
      let pools = [];

      if (response.status == 200) {
        pools = [...pools, ...response.data.allUsers];
        return pools;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error: Something went wrong", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw err;
    }
  }
);

const operatorsByLocationSlice = createSlice({
  name: "operatorsByLocation",
  initialState: {
    response: null,
    loading: false,
    error: null,
    serverResponded: false,
  },
  extraReducers: (builder) => {
    builder.addCase(operatorsAvailable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(operatorsAvailable.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = null;
      state.serverResponded = action.payload ? true : false;
    });
    builder.addCase(operatorsAvailable.rejected, (state, action) => {
      state.loading = false;
      state.error = { ...action.error };
      state.serverResponded = false;
    });
  },
});

export default operatorsByLocationSlice;
