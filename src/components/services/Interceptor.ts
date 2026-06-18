import { ENV } from "../../config/env";
import { tokenStorage } from "./utilities/TokenStorage";


let isRefreshing = false;
let refreshQueue: Function[] = [];

// Helper to notify queued requests
function processQueue(token: string | null) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

// export async function getRefreshToken() {
//   const refreshToken = tokenStorage.getRefresh();

//   if (!refreshToken) {
//     tokenStorage.clear();
//     throw new Error("No refresh token");
//   }

//   const res = await fetch(`${ENV.userAuthApi}/auth/refresh`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refreshToken }),
//   });
//   if (!res.ok) {
//     tokenStorage.clear();
//     throw new Error("Refresh failed");
//   }

//   const json = await res.json();

//   const accessToken = json.data.accessToken;
//   const newRefreshToken = json.data.refreshToken ?? refreshToken;

//   if (!accessToken) {
//     tokenStorage.clear();
//     throw new Error("Missing access token");
//   }

//   tokenStorage.set(accessToken, newRefreshToken);

//   return accessToken;
// }

type HttpOptions = RequestInit & {
  authType?: "bearer" | "basic" | "none";
  baseUrl?: string;
};

/** Where API calls go through and default is UserAuth */
export async function httpFetch(url: string, options: HttpOptions = {}): Promise<any> {

  const { authType = "none", baseUrl = ENV.sageUnityApi, ...rest } = options;

  const token = tokenStorage.getAccess();

  const isFormData = typeof FormData !== "undefined" && rest.body && rest.body.constructor.name === "FormData";

  let authHeader = {};
  switch(authType){
    case "bearer":
      if (token) authHeader = { Authorization: `Bearer ${token}`, };
      break;
    case "basic":
      authHeader = { Authorization: `Basic ${btoa(`${ENV.userName}:${ENV.passWord}`)}`, };
      break;
    case "none":
    default:
      break;
  }
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(rest.headers || {}),
    ...authHeader,
  };

  let response = await fetch(`${baseUrl}${url}`, { ...rest, headers, });

  // If token expired
  if (authType === "bearer" && response.status === 401) {

    // Wait for refresh to complete
    return new Promise((resolve, reject) => {
      refreshQueue.push(async (newToken: string | null) => {
        try {
          if (!newToken) {
            tokenStorage.clear();
            window.location.href = "/login";
            reject(new Error("Unauthorized"));

            return;
          }

          const retryRes = await fetch(`${baseUrl}${url}`, {
            ...rest,
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json", }),
                ...(authType === "bearer" ? { Authorization: `Bearer ${newToken}`, } : {}),
              },
          });

          resolve(retryRes);
        }
        catch (err) {
          reject(err);
        }

      });
      // if (!isRefreshing) {
      //   isRefreshing = true;

      //   getRefreshToken()
      //     .then((newToken) => {
      //       processQueue(newToken);
      //     })
      //     .catch(() => {
      //       processQueue(null);

      //       tokenStorage.clear();

      //       window.location.href = "/login";
      //     })
      //     .finally(() => {
      //       isRefreshing = false;
      //     });
      // }
    });
  }

  return response;
}