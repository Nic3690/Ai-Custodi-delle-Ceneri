import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initConsent } from "./lib/consent";

// Riattiva gli strumenti di analisi se l'utente aveva già dato il consenso.
initConsent();

createRoot(document.getElementById("root")!).render(<App />);
