// Gestione del consenso cookie (GDPR / Garante Privacy).
// Gli strumenti di analisi (Google Analytics e Microsoft Clarity) vengono
// caricati SOLO dopo il consenso esplicito dell'utente: finché non si accetta,
// nessuno script di tracciamento parte.

const STORAGE_KEY = "cookie-consent-v1";
const GA_ID = "G-PKDMSP3Y9X";
const CLARITY_ID = "xa5lcsc0zz";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/** Evento usato per riaprire il banner ("Gestisci le tue preferenze"). */
export const COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export const getConsent = (): Consent | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

let trackersLoaded = false;

const loadTrackers = () => {
  if (trackersLoaded || typeof document === "undefined") return;
  trackersLoaded = true;

  // --- Google Analytics (gtag.js) ---
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(ga);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  // --- Microsoft Clarity (snippet ufficiale) ---
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function () {
        // eslint-disable-next-line prefer-rest-params
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode!.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
};

/** Salva la scelta dell'utente e, se accetta, avvia subito i tracker. */
export const setConsent = (value: Consent) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* localStorage non disponibile: la scelta vale solo per questa sessione */
  }
  if (value === "granted") loadTrackers();
};

/** Da chiamare all'avvio dell'app: riattiva i tracker se il consenso c'è già. */
export const initConsent = () => {
  if (getConsent() === "granted") loadTrackers();
};

/** Riapre il banner per modificare la scelta. */
export const openCookieSettings = () => {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
};
