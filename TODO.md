# TODO — Ai Custodi delle Ceneri

## Fatto (sessione 2026-06-19)
- Redesign completo (Home con hero a immagine + zoom sulla sfera, E-Book, Bio, Galleria a griglia "a fuoco", Galleria interna a scorrimento orizzontale, Contatti, Secret).
- Palette definitiva: sfondo `#141414`, testo `#f2faef`, accent `#fe4a00`; rimosso del tutto `#41b4a0`.
- Smooth scroll (Lenis) solo su desktop; mobile nativo (niente scatti).
- Immagini sparse nella Home (stessa dimensione, crescono con lo scroll).
- HUD: righello scroll (verticale desktop / orizzontale mobile), coordinate, timestamp; sfumatura nera in fondo.
- Ottimizzazione immagini (≈38MB → ≈5.5MB) + bundle 407KB → 297KB.
- PDF "La grande pesca" aggiornato + cache-bust (`?v=2`).
- Rimosse TUTTE le tracce di Lovable (config, README, dipendenza, favicon).
- Pulizia codice: rimossi componenti morti, 47 componenti `ui/` inutilizzati, 39 dipendenze npm orfane.
- SEO + GEO: `lang=it`, meta completi, Open Graph/Twitter con immagine 1200×630, JSON-LD (WebSite/Person/BookSeries/Book), `useSeo` per-rotta, `robots.txt`, `sitemap.xml`, `llms.txt`.
- Google Search Console: proprietà "Prefisso URL" verificata (meta tag).

## Da fare / verificare
- [ ] Inviare la sitemap su Search Console: `https://aicustodidelleceneri.it/sitemap.xml`.
- [ ] Verificare anteprima social (es. opengraph.xyz) e che il nuovo favicon sia visibile (cache browser/GSC aggiornano con ritardo).
- [ ] Confermare che il dominio `aicustodidelleceneri.it` sia collegato su Vercel (il DNS è su Rocket Hosting).
- [ ] (opz.) Allineare il branch git: si lavora su `caverzasio-redesign`, il deploy si fa con `git push origin caverzasio-redesign:main`.

## Note deploy
Produzione = branch `main` su Vercel. Dal branch locale `caverzasio-redesign`:
`git push origin caverzasio-redesign:main`
