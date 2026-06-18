export const tokenStorage = {
  set(access: string, refresh?: string) {
    localStorage.setItem("access_token", access);
    if (refresh) localStorage.setItem("refresh_token", refresh);
  },

  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  getAccess() {
    return localStorage.getItem("access_token");
  },

  getRefresh(): any {
    return localStorage.getItem("refresh_token");
  },
};