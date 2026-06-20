import { Link } from "react-router-dom";
import { LegalLayout } from "@/components/LegalLayout";
import { openCookieSettings } from "@/lib/consent";

const CookiePolicy = () => (
  <LegalLayout title="Cookie Policy" updated="20 giugno 2026">
    <p>
      Questa pagina spiega quali cookie e tecnologie simili utilizza il sito{" "}
      <strong>aicustodidelleceneri.it</strong> e come puoi gestirli. Per il
      trattamento dei dati personali, consulta la{" "}
      <Link to="/privacy-policy">Privacy Policy</Link>.
    </p>

    <h2>Cosa sono i cookie</h2>
    <p>
      I cookie sono piccoli file di testo che i siti salvano sul dispositivo
      dell’utente. Possono essere <strong>tecnici</strong> (necessari al
      funzionamento) oppure di <strong>analisi/profilazione</strong>, che
      richiedono il consenso preventivo dell’utente.
    </p>

    <h2>Cookie tecnici (necessari)</h2>
    <p>
      Per memorizzare la tua scelta sui cookie, il sito salva una preferenza nel
      tuo browser (<code>cookie-consent</code>). Non richiede consenso perché è
      indispensabile a rispettare la tua decisione e non serve a tracciarti.
    </p>

    <h2>Cookie di analisi (previo consenso)</h2>
    <p>
      Questi strumenti vengono attivati <strong>solo se accetti</strong>. Se
      rifiuti, non vengono installati.
    </p>
    <table>
      <thead>
        <tr>
          <th>Cookie</th>
          <th>Fornitore</th>
          <th>Finalità</th>
          <th>Durata</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>_ga, _ga_*</td>
          <td>Google Analytics</td>
          <td>Statistiche di visita anonime</td>
          <td>fino a 13 mesi</td>
        </tr>
        <tr>
          <td>_clck, _clsk, CLID</td>
          <td>Microsoft Clarity</td>
          <td>Analisi di utilizzo, mappe di calore, registrazioni anonime</td>
          <td>fino a 1 anno</td>
        </tr>
      </tbody>
    </table>

    <h2>Gestire le tue preferenze</h2>
    <p>
      Puoi modificare o revocare il consenso in qualsiasi momento:
    </p>
    <p>
      <button
        type="button"
        onClick={openCookieSettings}
        className="border border-accent text-accent px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors hover:bg-accent hover:text-background"
      >
        Gestisci le tue preferenze
      </button>
    </p>
    <p>
      In alternativa, puoi bloccare o eliminare i cookie dalle impostazioni del
      tuo browser. Disattivando i cookie tecnici alcune funzioni potrebbero non
      funzionare correttamente.
    </p>
  </LegalLayout>
);

export default CookiePolicy;
