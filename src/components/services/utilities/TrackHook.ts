import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "./Analytics";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const sessionId = sessionStorage.getItem("session_id");

    if (!sessionId) return;

    trackPage(sessionId, location.pathname);
  }, [location]);
};
