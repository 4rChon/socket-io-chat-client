import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  settingsVisible: false,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    showSettings: (state) => {
      state.settingsVisible = true;
    },
    hideSettings: (state) => {
      state.settingsVisible = false;
    },
  },
});

export const { showSettings, hideSettings } = pagesSlice.actions;

export const pagesSelector = (state) => state.pages;
export default pagesSlice.reducer;
