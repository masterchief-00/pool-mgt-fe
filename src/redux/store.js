import { configureStore } from "@reduxjs/toolkit";
import predictionSlice from "./slices/predictionSlice";
import activeLinksSlice from "./slices/activeLinkSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    prediction: predictionSlice.reducer,
    activeLinks: activeLinksSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
