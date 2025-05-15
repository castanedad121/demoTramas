import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../store/orderSlice";
import { fetchToken } from "../store/orderThunks";
import generateOrder from "../utils/generateOrder";
import removeKeyRecursive from "../utils/removeKeyRecursive";
import getCurrentTransactionTime from "../utils/getCurrentTransactionTime";

const PaymentButton = ({ amount, merchantCodeT1, orderKey }) => {
  const dispatch = useDispatch();
  const { transactionId, orderNumber, token, status } = useSelector(
    (state) => state.order[orderKey]
  );

  useEffect(() => {
    const { transactionId, orderNumber } = generateOrder();
    dispatch(setOrder({ transactionId, orderNumber, orderKey }));
    dispatch(
      fetchToken({
        transactionId,
        orderData: {
          requestSource: "ECOMMERCE",
          merchantCode: merchantCodeT1,
          orderNumber,
          publicKey: "VErethUtraQuxas57wuMuquprADrAHAb",
          amount,
        },
        orderKey,
      })
    );
  }, [amount, merchantCodeT1, dispatch, orderKey]);

  const handlePayment = () => {
    const paymentMessage = document.querySelector(`#payment-messageT1`);
    const objetConfig = document.querySelector(`#objet-configT1`);
    paymentMessage.innerHTML = "";
    if (!token || !window.Izipay) {
      console.error("Izipay no está cargado o el token es inválido.");
      return;
    }

    const paymentConfig = {
      transactionId,
      action: window.Izipay.enums.payActions.PAY,
      merchantCode: merchantCodeT1,
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
        container: `#iframe-payment-${orderKey}`,
        showButtonProcessForm: true,
        redirectUrls: {
          onSuccess: "http://localhost:5173/",
          onError: "http://localhost:5173/",
          onCancel: "http://localhost:5173/",
        },
      },
      appearance: {
        logo: "",
        theme: window.Izipay.enums.theme.RED,
      },
    };

    const checkout = new window.Izipay({ config: paymentConfig });
    console.log("🟢 Configuración enviada a Izipay Trama 1:", paymentConfig);
    const callbackResponsePayment = (response) => {
      console.log("🔹 Respuesta de Izipay Trama 1:", response); // ✅ Ver en la consola
      if (paymentMessage) {
        //let formattedResponse = removeKeyRecursive(response, "payloadHttp");
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
    <>
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
      <pre id={`payment-message-${orderKey}`} />
      <pre id={`objet-config-${orderKey}`} />
      <div id={`iframe-payment-${orderKey}`}></div>
    </>
  );
};

export default PaymentButton;
