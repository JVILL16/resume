import { ENV } from "../../config/env";
import { handleResponse } from "./Helper";
import { httpFetch } from "./Interceptor";


export const getDailyPuzzle = async () => {
  const res = await httpFetch("/external/dailyChessPuzzle", {
        method: "GET",
        authType: "basic",
    });
  return handleResponse(res);
};

export const getQuote = async () => {
  const res = await httpFetch("/external/quotes", {
        method: "GET",
        authType: "basic",
    });

  return handleResponse(res);
};