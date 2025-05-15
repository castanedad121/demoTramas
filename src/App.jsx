import React from "react";
import Checkout from "./components/Checkout";
import "./index.css";
const App = () => {
  return (
    <div
      id="root"
      className="flex flex-col items-center justify-start w-screen min-h-screen gap-4  bg-[#030712] text-neutral-300"
    >
      <header className="flex w-full py-4 border-b-[1px] border-[#FF4240] justify-center items-center  ">
        <div className="flex justify-center w-1/4">
          <a href="/">
            <img
              src="https://developers.izipay.pe/logo/dark.svg"
              alt=""
              className="px-4 md:px-2 h-8"
            />
          </a>
        </div>
        <div className="w-2/4 flex justify-center">
          <h1 className="font-semibold text-base text-wrap text-center hidden md:block md:text-lg">
            Compración de Tramas en Punto Web
          </h1>
          <h1 className="font-semibold text-base text-wrap text-center block md:hidden md:text-lg">
            Tramas PW
          </h1>
        </div>

        <a
          href="https://developers.izipay.pe/web-core/"
          className="w-1/4 flex justify-center items-center gap-3"
        >
          <h2 className="hidden md:block">SDK</h2>
          <img
            src="https://developers.izipay.pe/img/landing-page/sdk-icons/js.png"
            alt=""
            className="h-6 md:h-8"
          />
          <h2 className="hidden md:block">JavaScript</h2>
        </a>
      </header>
      <Checkout />
    </div>
  );
};

export default App;
