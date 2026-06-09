import { ENV } from "../../config/env";

type HttpOptions = RequestInit & {
  auth?: boolean;
  baseUrl?: string;
};

/** Where API calls go through and default is UserAuth */
export async function httpFetch(url: string, options: HttpOptions = {}): Promise<any> {
  const { auth = true, baseUrl = ENV.sageUnityApi, ...rest } = options;


  const isFormData = typeof FormData !== "undefined" &&
                      rest.body && rest.body.constructor.name === "FormData";
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(rest.headers || {}),
    // ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let response = await fetch(`${baseUrl}${url}`, { ...rest, headers, });

  // If token expired
  // if (auth && response.status === 401) {


  //   // Wait for refresh to complete
  //   return new Promise((resolve, reject) => {
  //     refreshQueue.push(async (newToken: string | null) => {
  //       try {
  //         if (!newToken) {
  //           tokenStorage.clear();
  //           window.location.href = "/login";
  //           reject(new Error("Unauthorized"));

  //           return;
  //         }

  //         const retryRes = await fetch(`${baseUrl}${url}`, {
  //           ...rest,
  //           headers: {
  //               ...(isFormData ? {} : { "Content-Type": "application/json", }),
  //               ...(auth ? { Authorization: `Bearer ${newToken}`, } : {}),
  //             },
  //         });

  //         resolve(retryRes);
  //       }
  //       catch (err) {
  //         reject(err);
  //       }

  //     });
  //     if (!isRefreshing) {
  //       isRefreshing = true;

  //       getRefreshToken()
  //         .then((newToken) => {
  //           processQueue(newToken);
  //         })
  //         .catch(() => {
  //           processQueue(null);

  //           tokenStorage.clear();

  //           window.location.href = "/login";
  //         })
  //         .finally(() => {
  //           isRefreshing = false;
  //         });
  //     }
  //   });
  // }

  return response;
}