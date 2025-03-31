import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface RequestTypeState {
  requestType: string;
}

const initialState: RequestTypeState = {
  requestType: "",
};

const requestTypeSlice = createSlice({
  name: "requestType",
  initialState,
  reducers: {
    setRequestType: (state, action: PayloadAction<string>) => {
      state.requestType = action.payload;
    },
    resetRequestType: (state) => {
      state.requestType = "";
    },
  },
});

export const { setRequestType, resetRequestType } = requestTypeSlice.actions;


export const selectRequestType = (state: RootState) => state?.selectedRequest?.requestType;
export const selectIsRequestTypeSet = (state: RootState) => state.selectedRequest.requestType !== "";
export const selectIsRequestTypeEmpty = (state: RootState) => state.selectedRequest.requestType === "";

export default requestTypeSlice.reducer;