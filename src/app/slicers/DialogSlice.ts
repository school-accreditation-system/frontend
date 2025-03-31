import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    isOpen: false,
    wasOpened: false,
  },
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
      state.wasOpened = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
    resetDialog: (state) => {
        state.isOpen  = false;
        state.wasOpened = false;
    }
  },
});

export const { openDialog, closeDialog,resetDialog } = dialogSlice.actions;

export default dialogSlice;
