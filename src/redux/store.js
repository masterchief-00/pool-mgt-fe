import { configureStore } from "@reduxjs/toolkit";
import predictionSlice from "./slices/predictionSlice";

const store = configureStore({
  reducer: {
    prediction: predictionSlice.reducer,
  },
});

export default store;
