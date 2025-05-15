// src/store/orderThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import getParamsEnv from "../hooks/getParamsEnv.js";

const { API_URL_BASE } = getParamsEnv();

export const fetchToken = createAsyncThunk(
  "order/fetchToken",
  async ({ transactionId, orderData, orderKey }) => {
    console.log("Enviando orderData:", orderData);
    console.log("TransactionId:", transactionId);

    const response = await fetch(`${API_URL_BASE}api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transactionId,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Error en API token:", text);
      throw new Error(`API error ${response.status}: ${text}`);
    }

    const data = await response.json();
    console.log(data);

    return {
      token: data.response.token,
      transactionId,
      orderNumber: orderData.orderNumber,
      orderKey,
    };
  }
);
