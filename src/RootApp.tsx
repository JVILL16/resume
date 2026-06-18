import "./App.css";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import AppRouter from "./AppRouter";
import { ENV } from "./config/env";
import { BrowserRouter as Router } from "react-router-dom";
import { getSessionId, getUTMParams } from "./components/services/utilities/Session";
import { endSession, startSessionPing, trackSession } from "./components/services/utilities/Analytics";

function RootApp() {
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = getSessionId();

  // -------------------------
  // INITIAL LOAD + SESSION START
  // -------------------------
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    const timeout = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, hasLoaded ? 0 : 1500);

    trackSession({
      sessionId,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      landingPage: window.location.href,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      utm: getUTMParams(),
    });

    return () => clearTimeout(timeout);
  }, []);

  // -------------------------
  // PINGING SESSION
  // -------------------------
  useEffect(() => {
    if (!sessionId) return;

    const ping = async () => {
      try {
        await startSessionPing(sessionId);
      } catch {
        // Ignore failures
      }
    };

    ping();
    const interval = setInterval(ping, 300000);
    return () => clearInterval(interval);
  }, [sessionId]);

  // -------------------------
  // SESSION END (TAB CLOSE)
  // -------------------------
// useEffect(() => {
//   if (!sessionId) return;

//   const handleExit = () => {
//     endSession(sessionId).catch(() => {});
//   };

//   window.addEventListener("pagehide", handleExit);

//   return () => {
//     window.removeEventListener("pagehide", handleExit);
//   };
// }, [sessionId]);






  if (isLoading) {
    return <LoadingScreen />;
  }

  return (<Router><AppRouter /></Router>);
}

export default RootApp;