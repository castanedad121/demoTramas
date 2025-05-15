import React, { useEffect, useState } from "react";
import PaymentButton from "./PaymentButton";
import PaymentButtonT2 from "./PaymentButtonT2";
import { AmountInput } from "./AmountInput";
import { CustomFields } from "./CustomFields";

// icons
import { MdCopyAll } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";

const Checkout = () => {
  const [viewResponseT1, setViewResponseT1] = useState(true);
  const [viewObjetConfigT1, setViewObjetConfigT1] = useState(true);
  const [viewResponseT2, setViewResponseT2] = useState(true);
  const [viewObjetConfigT2, setViewObjetConfigT2] = useState(true);
  const [viewAllCustomT1, setViewAllCustomT1] = useState(false);
  const [viewAllCustomT2, setViewAllCustomT2] = useState(false);
  const [viewAmountInputT1, setViewAmountInputT1] = useState(false);
  const [viewAmountInputT2, setViewAmountInputT2] = useState(false);
  const [viewCustomFields, setViewCustomFields] = useState(false);
  const [amountT1, setAmountT1] = useState("1.99");
  const [amountT2, setAmountT2] = useState("1.99");
  const [customData, setCustomData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    field8: "",
    field9: "",
    field10: "",
  });
  const [merchantCodeT1, setMerchantCodeT1] = useState("4004345");
  const [merchantCodeT2, setMerchantCodeT2] = useState("4004353");
  const [copiedMessage, setCopiedMessage] = useState("");

  const handleCopy = (id) => {
    const text = document.getElementById(id)?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedMessage(id);
      setTimeout(() => setCopiedMessage(""), 2000);
    }
  };

  const handleViewAllCustomT1 = () => {
    setViewAllCustomT1((prev) => {
      const newState = !prev;
      setViewAmountInputT1(newState);
      return newState;
    });
  };

  const handleViewAllCustomT2 = () => {
    setViewAllCustomT2((prev) => {
      const newState = !prev;
      setViewAmountInputT2(newState);
      setViewCustomFields(newState);
      return newState;
    });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 overflow-hidden px-2">
      {/* Trama 1 */}
      <section className="flex flex-col gap-2 w-full lg:w-1/2 py-4 px-2 border rounded-md border-[#1A90FF] overflow-hidden">
        <div className="flex border-b border-[#1A90FF] w-full justify-between items-center">
          <h2 className="text-slate-200 pb-1">Trama 1:</h2>
          <RiArrowDownSLine
            className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#1A90FF] ${
              !viewAllCustomT1 && "rotate-180 pb-0 pt-1"
            }`}
            onClick={handleViewAllCustomT1}
          />
        </div>
        <AmountInput
          amount={amountT1}
          setAmount={setAmountT1}
          viewAmountInput={viewAmountInputT1}
          setViewAmountInput={setViewAmountInputT1}
          merchantCode={merchantCodeT1}
          setMerchantCode={setMerchantCodeT1}
        />
        <div className="w-full flex justify-center p-5">
          <PaymentButton
            amount={amountT1}
            merchantCodeT1={merchantCodeT1}
            orderKey={"orderT1"}
          />
        </div>
        <section className="flex flex-col items-center">
          {/* Objeto Config T1 */}
          <div className="flex flex-col p-2 justify-center items-center border rounded-md border-[#00A09D] w-full my-2">
            <div className="flex border-b border-[#00A09D] w-full justify-between items-center">
              <h2 className="text-slate-200 pb-1">Objeto Config:</h2>
              <div className="flex gap-1">
                <MdCopyAll
                  className="size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#00A09D]"
                  onClick={() => handleCopy("objet-configT1")}
                />
                <RiArrowDownSLine
                  className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#00A09D] ${
                    !viewObjetConfigT1 && "rotate-180 pb-0 pt-1"
                  }`}
                  onClick={() => setViewObjetConfigT1(!viewObjetConfigT1)}
                />
              </div>
            </div>
            <pre
              id="objet-configT1"
              className={`relative w-full p-2 font-light text-slate-300 text-sm overflow-y-auto max-h-[225px] ${
                viewObjetConfigT1 ? "block" : "hidden"
              }`}
            >
              {copiedMessage === "objet-configT1" && (
                <div className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                  ¡Texto copiado! ✅
                </div>
              )}
            </pre>
          </div>
          {/* Response T1 */}
          <div className="flex flex-col p-2 justify-center items-center border rounded-md border-[#FF4240] w-full my-2">
            <div className="flex border-b border-[#FF4240] w-full justify-between items-center">
              <h2 className="text-slate-200 pb-1">Response:</h2>
              <div className="flex gap-1">
                <MdCopyAll
                  className="size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#FF4240]"
                  onClick={() => handleCopy("payment-messageT1")}
                />
                <RiArrowDownSLine
                  className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#FF4240] ${
                    !viewResponseT1 && "rotate-180 pb-0 pt-1"
                  }`}
                  onClick={() => setViewResponseT1(!viewResponseT1)}
                />
              </div>
            </div>
            <pre
              id="payment-messageT1"
              className={`relative w-full p-2 font-light text-slate-300 text-sm overflow-y-auto max-h-[225px] ${
                viewResponseT1 ? "block" : "hidden"
              }`}
            >
              {copiedMessage === "payment-messageT1" && (
                <div className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                  ¡Texto copiado! ✅
                </div>
              )}
            </pre>
          </div>
        </section>
      </section>

      {/* Trama 2 */}
      <section className="flex flex-col  gap-2 w-full lg:w-1/2 py-4 px-2 border rounded-md border-[#1A90FF] overflow-hidden">
        <div className="flex border-b border-[#1A90FF] w-full justify-between items-center">
          <h2 className="text-slate-200 pb-1">Trama 2:</h2>
          <RiArrowDownSLine
            className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#1A90FF] ${
              !viewAllCustomT2 && "rotate-180 pb-0 pt-1"
            }`}
            onClick={handleViewAllCustomT2}
          />
        </div>
        <AmountInput
          amount={amountT2}
          setAmount={setAmountT2}
          viewAmountInput={viewAmountInputT2}
          setViewAmountInput={setViewAmountInputT2}
          merchantCode={merchantCodeT2}
          setMerchantCode={setMerchantCodeT2}
        />
        <CustomFields
          customData={customData}
          setCustomData={setCustomData}
          viewCustomFields={viewCustomFields}
          setViewCustomFields={setViewCustomFields}
        />
        <div className="w-full flex justify-center">
          <PaymentButtonT2
            amount={amountT2}
            customData={customData}
            merchantCodeT2={merchantCodeT2}
            orderKey={"orderT2"}
          />
        </div>
        <section className="flex flex-col items-center">
          {/* Objeto Config T2 */}
          <div className="flex flex-col p-2 justify-center items-center border rounded-md border-[#00A09D] w-full my-2">
            <div className="flex border-b border-[#00A09D] w-full justify-between items-center">
              <h2 className="text-slate-200 pb-1">Objeto Config:</h2>
              <div className="flex gap-1">
                <MdCopyAll
                  className="size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#00A09D]"
                  onClick={() => handleCopy("objet-configT2")}
                />
                <RiArrowDownSLine
                  className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#00A09D] ${
                    !viewObjetConfigT2 && "rotate-180 pb-0 pt-1"
                  }`}
                  onClick={() => setViewObjetConfigT2(!viewObjetConfigT2)}
                />
              </div>
            </div>
            <pre
              id="objet-configT2"
              className={`relative w-full p-2 font-light text-slate-300 text-sm overflow-y-auto max-h-[225px] ${
                viewObjetConfigT2 ? "block" : "hidden"
              }`}
            >
              {copiedMessage === "objet-configT2" && (
                <div className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                  ¡Texto copiado! ✅
                </div>
              )}
            </pre>
          </div>
          {/* Response T2 */}
          <div className="flex flex-col p-2 justify-center items-center border rounded-md border-[#FF4240] w-full my-2">
            <div className="flex border-b border-[#FF4240] w-full justify-between items-center">
              <h2 className="text-slate-200 pb-1">Response:</h2>
              <div className="flex gap-1">
                <MdCopyAll
                  className="size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#FF4240]"
                  onClick={() => handleCopy("payment-messageT2")}
                />
                <RiArrowDownSLine
                  className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#FF4240] ${
                    !viewResponseT2 && "rotate-180 pb-0 pt-1"
                  }`}
                  onClick={() => setViewResponseT2(!viewResponseT2)}
                />
              </div>
            </div>
            <pre
              id="payment-messageT2"
              className={`relative w-full p-2 font-light text-slate-300 text-sm overflow-y-auto max-h-[225px] ${
                viewResponseT2 ? "block" : "hidden"
              }`}
            >
              {copiedMessage === "payment-messageT2" && (
                <div className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                  ¡Texto copiado! ✅
                </div>
              )}
            </pre>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Checkout;
