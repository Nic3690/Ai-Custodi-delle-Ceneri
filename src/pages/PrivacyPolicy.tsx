import { Link } from "react-router-dom";
import { LegalLayout } from "@/components/LegalLayout";

const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" updated="20 giugno 2026">
    <p>
      La presente informativa descrive le modalità di trattamento dei dati
      personali degli utenti che consultano il sito{" "}
      <strong>aicustodidelleceneri.it</strong>, ai sensi del Regolamento (UE)
      2016/679 (“GDPR”).
    </p>

    <h2>Titolare del trattamento</h2>
    <p>
      Il titolare del trattamento è <strong>Naq Evius</strong>, contattabile
      all’indirizzo{" "}
      <a href="mailto:aicustodidelleceneri@gmail.com">
        aicustodidelleceneri@gmail.com
      </a>
      .
    </p>

    <h2>Tipologie di dati raccolti</h2>
    <p>Il sito può trattare le seguenti categorie di dati:</p>
    <ul>
      <li>
        <strong>Dati di navigazione e utilizzo</strong> (es. pagine visitate,
        durata della visita, tipo di dispositivo e browser, interazioni come il
        download degli e-book), raccolti dagli strumenti di analisi{" "}
        <strong>solo previo consenso</strong>.
      </li>
      <li>
        <strong>Dati forniti volontariamente</strong> dall’utente, ad esempio
        scrivendo all’indirizzo email o tramite i profili social indicati nella
        pagina Contatti.
      </li>
    </ul>

    <h2>Finalità e base giuridica</h2>
    <ul>
      <li>
        <strong>Statistiche e miglioramento del sito</strong> (strumenti di
        analisi) — base giuridica: <strong>consenso</strong> dell’utente (art. 6,
        par. 1, lett. a GDPR). Il consenso è facoltativo e revocabile in
        qualsiasi momento.
      </li>
      <li>
        <strong>Rispondere alle richieste</strong> inviate via email o social —
        base giuridica: riscontro a una richiesta dell’interessato.
      </li>
    </ul>

    <h2>Strumenti di analisi e soggetti terzi</h2>
    <p>
      Previo consenso, il sito utilizza strumenti di analisi forniti da terze
      parti, che possono trattare i dati anche al di fuori dell’Unione Europea
      sulla base delle garanzie previste dal GDPR (es. clausole contrattuali
      standard):
    </p>
    <ul>
      <li>
        <strong>Google Analytics 4</strong> — fornito da Google Ireland Ltd. Gli
        indirizzi IP sono trattati in forma anonimizzata. Informativa:{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/privacy
        </a>
        .
      </li>
      <li>
        <strong>Microsoft Clarity</strong> — fornito da Microsoft Corporation,
        per analisi di utilizzo, mappe di calore e registrazioni anonimizzate
        delle sessioni. Informativa:{" "}
        <a
          href="https://privacy.microsoft.com/privacystatement"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy.microsoft.com
        </a>
        .
      </li>
    </ul>
    <p>
      Per il dettaglio dei cookie utilizzati e per gestire le preferenze,
      consulta la{" "}
      <Link to="/cookie-policy">Cookie Policy</Link>.
    </p>

    <h2>Hosting</h2>
    <p>
      Il sito è ospitato su <strong>Vercel Inc.</strong>, che in qualità di
      fornitore di hosting può trattare i dati di connessione (es. log del
      server) necessari all’erogazione del servizio.
    </p>

    <h2>Conservazione dei dati</h2>
    <p>
      I dati raccolti dagli strumenti di analisi sono conservati per il periodo
      previsto dai rispettivi fornitori (di norma fino a 14 mesi per Google
      Analytics e fino a 1 anno per Microsoft Clarity). I dati forniti via email
      sono conservati per il tempo necessario a gestire la richiesta.
    </p>

    <h2>Diritti dell’interessato</h2>
    <p>
      L’utente può in qualsiasi momento esercitare i diritti previsti dagli artt.
      15–22 del GDPR: accesso, rettifica, cancellazione, limitazione,
      opposizione e portabilità dei dati, oltre alla revoca del consenso. Per
      esercitarli può scrivere a{" "}
      <a href="mailto:aicustodidelleceneri@gmail.com">
        aicustodidelleceneri@gmail.com
      </a>
      . L’utente ha inoltre diritto di proporre reclamo all’Autorità Garante per
      la protezione dei dati personali (
      <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
        garanteprivacy.it
      </a>
      ).
    </p>
  </LegalLayout>
);

export default PrivacyPolicy;
