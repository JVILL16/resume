import { Routes, Route } from "react-router-dom";

import App from "./App";
import PricingPage from "./components/PricingPage";
import { usePageTracking } from "./components/services/utilities/TrackHook";

export default function AppRouter() {
    usePageTracking();
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/pricing" element={<PricingPage />} />
        </Routes>
    );
}