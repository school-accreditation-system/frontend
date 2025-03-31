import { configureStore } from '@reduxjs/toolkit';
import { DialogSlice, requestTypeSlice } from '../slicers';
import { resetRequestType } from '../slicers/RequestTypeSlice';


const store = configureStore({
    reducer: {
        dialog: DialogSlice.reducer,
        selectedRequest: requestTypeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;