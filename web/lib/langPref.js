"use client";
// Préférence de langue FR/EN — même stockage que spoilerGuard.js
// (localStorage, pas de compte utilisateur). Ne couvre que les articles
// qui ont réellement une traduction (voir ANALYSE_EN_HTML/PREANALYSE_EN_HTML
// dans RaceTabs.jsx) : les rounds sans version anglaise restent affichés
// en français avec une petite note, plutôt que de mélanger les langues en
// silence.
//
// Le bouton (dans SiteHeader, monté une fois dans le layout racine) et les
// pages qui lisent la langue (RaceTabs, ailleurs dans l'arbre) sont deux
// instances séparées de ce hook — exactement le cas qui désynchronisait
// l'anti-spoiler (cf. spoilerGuard.js) si on se contente d'un useState local
// par instance. Ici on synchronise via un évènement window personnalisé
// (l'évènement natif "storage" ne se déclenche que dans les AUTRES onglets,
// jamais dans celui qui vient d'écrire) plutôt que d'introduire un
// React Context pour une seule valeur globale.

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ptw_lang";
const CHANGE_EVENT = "ptw-lang-change";

function readLang() {
  if (typeof window === "undefined") return "fr";
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

export function useLangPref() {
  const [lang, setLangState] = useState(null); // null tant que non hydraté côté client

  useEffect(() => {
    setLangState(readLang());
    const onChange = () => setLangState(readLang());
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = readLang() === "en" ? "fr" : "en";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage indisponible — la préférence ne persiste juste pas.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { lang: lang ?? "fr", hydrated: lang !== null, toggle };
}
