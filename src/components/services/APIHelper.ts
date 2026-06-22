import { ENV } from "../../config/env";
import { handleResponse } from "./Helper";
import { httpFetch } from "./Interceptor";


export const createContactMessage = async (data: any) => {
  const res = await httpFetch("/contact/create", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};


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