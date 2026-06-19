import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { findStoryBySlug } from "@/data/artworks";

const SITE = "Ai Custodi delle Ceneri";
const ORIGIN = "https://aicustodidelleceneri.it";

interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

const ROUTES: Record<string, PageMeta> = {
  "/": {
    title: "Ai Custodi delle Ceneri — Saga Sci-Fi di Naq Evius",
    description:
      "Ai Custodi delle Ceneri è una saga di fantascienza corale di Naq Evius: la storia dell'umanità dal domani al XXIII secolo, raccontata per frammenti. E-book gratuiti, illustrazioni e worldbuilding.",
  },
  "/bio": {
    title: "Bio",
    description:
      "Naq Evius (Alessio Salvati) e i collaboratori dietro Ai Custodi delle Ceneri: autore, illustrazione e editing della saga sci-fi.",
  },
  "/stories": {
    title: "E-Book",
    description:
      "Gli e-book della saga Ai Custodi delle Ceneri: «La grande pesca» (gratuito) e «La Stazione del Ritorno» (in arrivo). Scarica e leggi.",
  },
  "/gallery": {
    title: "Galleria",
    description:
      "Le illustrazioni e le tavole della saga Ai Custodi delle Ceneri, realizzate in collaborazione con vari artisti.",
  },
  "/contacts": {
    title: "Contatti",
    description:
      "Contatti e social di Ai Custodi delle Ceneri: email, Instagram e come sostenere il progetto.",
  },
  "/secret": {
    title: "Accesso negato",
    description: "Qualcosa di più grande sta arrivando.",
    noindex: true,
  },
};

const upsert = (
  selectorAttr: "name" | "property",
  key: string,
  content: string
) => {
  const sel = `meta[${selectorAttr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(selectorAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/** Updates document title and SEO meta on every route change (SPA). */
export const useSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let meta: PageMeta | undefined = ROUTES[pathname];

    if (!meta && pathname.startsWith("/gallery/")) {
      const story = findStoryBySlug(pathname.split("/")[2]);
      meta = story
        ? {
            title: `${story.story} — Galleria`,
            description: `Le tavole e le illustrazioni di «${story.story}», dalla saga sci-fi Ai Custodi delle Ceneri.`,
          }
        : { title: "Galleria", description: ROUTES["/gallery"].description, noindex: true };
    }

    if (!meta) {
      meta = {
        title: "Pagina non trovata",
        description: "La pagina che cerchi non esiste.",
        noindex: true,
      };
    }

    const fullTitle = meta.title.includes(SITE)
      ? meta.title
      : `${meta.title} — ${SITE}`;
    const url = ORIGIN + pathname;

    document.title = fullTitle;
    upsert("name", "description", meta.description);
    upsert(
      "name",
      "robots",
      meta.noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large"
    );
    upsert("property", "og:title", fullTitle);
    upsert("property", "og:description", meta.description);
    upsert("property", "og:url", url);
    upsert("name", "twitter:title", fullTitle);
    upsert("name", "twitter:description", meta.description);

    let canon = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", url);
  }, [pathname]);
};
