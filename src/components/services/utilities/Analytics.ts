
import { ENV } from "../../../config/env";
import { httpFetch } from "../Interceptor";

/**
 * SESSIONS (SageUnity API)
 */
export const trackSession = async (data: any) => {
  const res = await httpFetch("/sessions/start", {
    method: "POST",
    baseUrl: ENV.sageUnityApi,
    authType: "basic",
    body: JSON.stringify({
      sessionId: data.sessionId,
      userAgent: data.userAgent,
      referrer: data.referrer,
      landingPage: data.landingPage,
      screen: data.screen,
      language: data.language,
      timezone: data.timezone,
      utm: data.utm,
    }),
  });
};


export const trackPage = async (sessionId: string, url: string) => {
  return httpFetch("/sessions/trackPage", {
    method: "POST",
    authType: "basic",
    body: JSON.stringify({ sessionId, url, }),
  });
};

export const startSessionPing = async (sessionId: string) => {
  return httpFetch("/sessions/ping", {
    method: "POST",
    authType: "basic",
    body: JSON.stringify({ sessionId }),
  });
};

export const endSession = async (sessionId: string) => {
  return httpFetch("/sessions/end", {
    method: "POST",
    authType: "basic",
    keepalive: true,
    body: JSON.stringify({ sessionId }),
  });
};