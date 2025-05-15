// src/store/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchToken } from "./orderThunks";

const initialState = {
  orderT1: {
    token: null,
    transactionId: null,
    orderNumber: null,
    status: "idle",
  },
  orderT2: {
    token: null,
    transactionId: null,
    orderNumber: null,
    status: "idle",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action) {
      const { orderKey, transactionId, orderNumber } = action.payload;
      state[orderKey].transactionId = transactionId;
      state[orderKey].orderNumber = orderNumber;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state, action) => {
        const orderKey = action.meta.arg.orderKey;
        state[orderKey].status = "loading";
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        const { orderKey, token, transactionId, orderNumber } = action.payload;
        state[orderKey].token = token;
        state[orderKey].transactionId = transactionId;
        state[orderKey].orderNumber = orderNumber;
        state[orderKey].status = "succeeded";
      })
      .addCase(fetchToken.rejected, (state, action) => {
        const orderKey = action.meta.arg.orderKey;
        state[orderKey].status = "failed";
      });
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
