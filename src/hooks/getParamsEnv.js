//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
  const SECURE = import.meta.env.SECURE === "true";
  const API_URL_BASE = SECURE
    ? import.meta.env.API_URL_BASE
    : "http://localhost:4242/";

  return {
    SECURE,
    API_URL_BASE,
  };
}
