//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
  console.log(import.meta.env.VITE_SECURE);
  console.log(import.meta.env.VITE_API_URL_BASE);
  const SECURE = import.meta.env.VITE_SECURE === "TRUE";
  const API_URL_BASE = SECURE
    ? import.meta.env.VITE_API_URL_BASE
    : "http://localhost:4242/";

  console.log(API_URL_BASE);

  return {
    SECURE,
    API_URL_BASE,
  };
}
