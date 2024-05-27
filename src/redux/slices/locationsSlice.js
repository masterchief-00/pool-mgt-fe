import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const SERVER_URL = "http://localhost:3000";

export const getLocations = createAsyncThunk(
  "locations/pools",
  async (location) => {
    try {
      const tokenStr = localStorage.getItem("token");

      const response = await axios({
        method: "get",
        url: `${SERVER_URL}/pools/locations`,
        headers: { Authorization: `Bearer ${tokenStr}` },
      });
      let locations = [];

      if (response.status == 200) {
        locations = [...locations, ...response.data.allPools];
        return locations;
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

const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    response: null,
    loading: false,
    error: null,
    serverResponded: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getLocations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.response = action.payload;
      state.error = null;
      state.serverResponded = action.payload ? true : false;
    });
    builder.addCase(getLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = { ...action.error };
      state.serverResponded = false;
    });
  },
});

export default locationsSlice;
