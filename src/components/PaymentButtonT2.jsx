import React, { useEffect, useState } from "react";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { setOrder } from "../store/orderSlice";
import { fetchToken } from "../store/orderThunks";
import generateOrder from "../utils/generateOrder";
import removeKeyRecursive from "../utils/removeKeyRecursive";
import getCurrentTransactionTime from "../utils/getCurrentTransactionTime";

const PaymentButtonT2 = ({ amount, customData, merchantCodeT2, orderKey }) => {
  const {
    field1,
    field2,
    field3,
    field4,
    field5,
    field6,
    field7,
    field8,
    field9,
    field10,
  } = customData;

  const dispatch = useDispatch();
  const { transactionId, orderNumber, token, status } = useSelector(
    (state) => state.order[orderKey]
  );
  console.log(transactionId, orderNumber, token, status);

  useEffect(() => {
    const { transactionId, orderNumber } = generateOrder();
    dispatch(setOrder({ transactionId, orderNumber, orderKey }));
    dispatch(
      fetchToken({
        transactionId,
        orderData: {
          requestSource: "ECOMMERCE",
          merchantCode: merchantCodeT2,
          orderNumber,
          publicKey: "VErethUtraQuxas57wuMuquprADrAHAb",
          amount,
        },
        orderKey,
      })
    );
  }, [amount, dispatch, orderKey, customData, merchantCodeT2]);

  const handlePayment = () => {
    const paymentMessage = document.querySelector("#payment-messageT2");
    const objetConfig = document.querySelector("#objet-configT2");
    // Limpiar mensaje de pago
    paymentMessage.innerHTML = "";
    // Verifica que el SDK esté cargado antes de continuar
    if (!token || !window.Izipay) {
      console.error("Izipay no está cargado o el token es inválido.");
      return;
    }

    const paymentConfig = {
      transactionId,

      action: window.Izipay.enums.payActions.PAY,
      merchantCode: merchantCodeT2,
      order: {
        orderNumber,
        currency: window.Izipay.enums.currency.PER,
        amount: amount,
        merchantBuyerId: "MC2149",
        dateTimeTransaction: getCurrentTransactionTime(),
        payMethod: window.Izipay.enums.showMethods.ALL,
        processType: window.Izipay.enums.processType.AUTHORIZATION,
      },
      billing: {
        firstName: "Daniel",
        lastName: "Castañeda",
        email: "jwick@izipay.pe",
        phoneNumber: "989339999",
        street: "calle el demo",
        city: "lima",
        state: "lima",
        country: "PE",
        postalCode: "00001",
        document: "12345678",
        documentType: window.Izipay.enums.documentType.DNI,
      },
      shipping: {
        firstName: "Daniel",
        lastName: "Castañeda",
        email: "jwick@izipay.pe",
        phoneNumber: "989339999",
        street: "calle el demo",
        city: "lima",
        state: "lima",
        country: "PE",
        postalCode: "00001",
        document: "12345678",
        documentType: window.Izipay.enums.documentType.DNI,
      },
      language: {
        init: window.Izipay.enums.langInit.ESP,
        showControlMultiLang: true,
      },
      render: {
        typeForm: window.Izipay.enums.typeForm.POP_UP,
        container: "#iframe-payment",
        showButtonProcessForm: true,
        redirectUrls: {
          onSuccess: "http://localhost:5173/",
          onError: "http://localhost:5173/",
          onCancel: "http://localhost:5173/",
        },
      },
      // urlIPN: "https://test-api-fooddelivery.aimo.co/izipay/ipn",
      appearance: {
        logo: "",
        theme: window.Izipay.enums.theme.RED,
      },

      customFields: [
        { name: "field1", value: field1 },
        { name: "field2", value: field2 },
        { name: "field3", value: field3 },
        { name: "field4", value: field4 },
        { name: "field5", value: field5 },
        { name: "field6", value: field6 },
        { name: "field7", value: field7 },
        { name: "field8", value: field8 },
        { name: "field9", value: field9 },
        { name: "field10", value: field10 },
      ],
    };

    const checkout = new window.Izipay({ config: paymentConfig });

    console.log("🟢 Configuración enviada a Izipay Trama 2:", paymentConfig);
    const callbackResponsePayment = (response) => {
      console.log("🔹 Respuesta de Izipay Trama 2:", response); // ✅ Ver en la consola

      if (paymentMessage) {
        // let formattedResponse = removeKeyRecursive(response, "payloadHttp");

        // Mostrar el JSON formateado en el frontend
        paymentMessage.innerHTML = JSON.stringify(response, null, 2);
        objetConfig.innerHTML = JSON.stringify(paymentConfig, null, 2);
      }
    };
    checkout.LoadForm({
      authorization: token,
      keyRSA: "RSA",
      callbackResponse: callbackResponsePayment,
    });
  };

  return (
    <button
      onClick={handlePayment}
      className={`w-max bg-[#FF4240] py-1 px-4 text-base cursor-pointer hover:bg-[#FF4240] rounded-sm hover:scale-95`}
      disabled={status === "loading"}
    >
      {status === "loading"
        ? "Loading..."
        : amount === ""
        ? "Ingresar Monto"
        : `PEN ${amount} →`}
    </button>
  );
};

export default PaymentButtonT2;
