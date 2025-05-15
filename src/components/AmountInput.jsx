import { RiArrowDownSLine } from "react-icons/ri";

export const AmountInput = ({
  amount,
  setAmount,
  viewAmountInput,
  setViewAmountInput,
  merchantCode,
  setMerchantCode,
}) => {
  const handleChange = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleBlur = () => {
    if (amount !== "") {
      setAmount(parseFloat(amount).toFixed(2));
    }
  };

  const handleChangeMerchantCode = (e) => {
    setMerchantCode(e.target.value);
  };

  return (
    <div className="w-full flex flex-col border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className="text-[#1A90FF] pb-2">Monto de pago:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
          ${!viewAmountInput && "rotate-180 pb-0 pt-1"}`}
          onClick={() => setViewAmountInput(!viewAmountInput)}
        />
      </div>

      <div
        className={`w-full ${
          viewAmountInput ? "flex" : "hidden"
        } flex-wrap gap-4 rounded-tr-md border-r-[1px] border-t-[1px] border-[#1A90FF] py-3`}
      >
        <div className="flex flex-col gap-1 w-full sm:w-[300px]">
          <h2 className="text-[#1A90FF]">Monto:</h2>
          <input
            type="text"
            value={amount}
            onChange={handleChange}
            onBlur={handleBlur}
            inputMode="decimal"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 
              text-sm border border-slate-300 rounded-md px-2 py-1 
              transition-all duration-300 ease-in-out focus:outline-none 
              focus:border-blue-500 focus:ring focus:ring-[#1A90FF]
              hover:border-blue-400 hover:shadow-md"
          />
        </div>

        <div className="flex flex-col gap-1 w-full sm:w-[300px]">
          <h2 className="text-[#1A90FF]">MerchantCode:</h2>
          <input
            type="text"
            value={merchantCode}
            onChange={handleChangeMerchantCode}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 
              text-sm border border-slate-300 rounded-md px-2 py-1 
              transition-all duration-300 ease-in-out focus:outline-none 
              focus:border-blue-500 focus:ring focus:ring-[#1A90FF]
              hover:border-blue-400 hover:shadow-md"
          />
        </div>
      </div>
    </div>
  );
};
