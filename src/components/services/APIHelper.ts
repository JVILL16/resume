import { ENV } from "../../config/env";
import { handleResponse } from "./Helper";
import { httpFetch } from "./Interceptor";

/**
 * SESSIONS (SageUnity API)
 */
export const trackSession = async (data: any) => {
  const res = await httpFetch("/sessions/start", {
    method: "POST",
    baseUrl: ENV.sageUnityApi,
    auth: false,
    body: JSON.stringify({
      sessionId: data.sessionId,
      websiteId: data.websiteId,
      userAgent: data.userAgent,
      referrer: data.referrer,
      landingPage: data.landingPage,
      screen: data.screen,
      language: data.language,
      timezone: data.timezone,
      utm: data.utm,
    }),
  });

  return handleResponse(res);
};


export const trackPage = async (sessionId: string, url: string) => {
  return httpFetch("/sessions/trackPage", {
    method: "POST",
    baseUrl: ENV.sageUnityApi,
    auth: false,
    body: JSON.stringify({
      sessionId,
      url,
    }),
  });
};

export const endSession = async (sessionId: string) => {
  return httpFetch("/sessions/end", {
    method: "POST",
    baseUrl: ENV.sageUnityApi,
    auth: false,
    body: JSON.stringify({ sessionId }),
  });
};
