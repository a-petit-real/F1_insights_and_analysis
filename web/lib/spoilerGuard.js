"use client";
// Anti-spoiler — état "vu" par séance, stocké en localStorage (pas de
// compte utilisateur sur ce site, donc pas de raison d'aller en base pour
// une préférence purement personnelle et locale au navigateur).
//
// Granularité : par séance (EL1/EL2/EL3/Quali/Race), déclarée manuellement
// par l'utilisateur (pas de détection automatique par date — on peut très
// bien ne pas avoir regardé une course qui a eu lieu il y a une semaine).
//
// Portée : uniquement à partir de SPOILER_FROM_ROUND. Les rounds antérieurs
// (déjà publiés, jamais pensés comme protégés) restent toujours visibles,
// pour ne pas masquer rétroactivement du contenu que l'utilisateur a déjà lu.
//
// Hypothèse assumée : on regarde la saison dans l'ordre. Le "round
// frontière" (dernier round dont la course est marquée vue, en partant de
// SPOILER_FROM_ROUND - 1) sert à afficher un classement général cohérent —
// cf. frontierRound plus bas. Si un jour on saute une course, le
// classement affiché restera figé à la dernière course course vue dans
// l'ordre, ce qui est le comportement voulu (pas de fuite via un round
// intermédiaire qu'on n'a pas encore regardé).

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ptw_watched_sessions";
export const SPOILER_FROM_ROUND = 13;
export const SESSION_ORDER = ["EL1", "EL2", "EL3", "Quali", "Race"];

function readStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(store) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage indisponible (navigation privée, quota) — la
    // protection anti-spoiler ne persiste juste pas d'une visite à
    // l'autre, pas grave pour une préférence de confort.
  }
}

export function isSessionWatched(store, round, session) {
  if (round < SPOILER_FROM_ROUND) return true;
  return Boolean(store?.[round]?.[session]);
}

// Dernier round (>= SPOILER_FROM_ROUND) dont la course est marquée vue, en
// remontant la saison dans l'ordre depuis SPOILER_FROM_ROUND - 1 (les
// rounds antérieurs sont toujours acquis). S'arrête au premier round de
// course pas encore vu, plutôt que de sauter dessus.
export function frontierRound(store, availableRounds) {
  let frontier = SPOILER_FROM_ROUND - 1;
  const upcoming = availableRounds.filter((r) => r >= SPOILER_FROM_ROUND).sort((a, b) => a - b);
  for (const round of upcoming) {
    if (isSessionWatched(store, round, "Race")) frontier = round;
    else break;
  }
  return frontier;
}

// Hook au niveau d'un round entier — une seule source de vérité pour
// toutes ses séances, à partager entre les boutons d'onglets (icône 🔒) et
// le panneau qui bloque le contenu (SpoilerGate). Deux instances
// indépendantes de useWatched(round, session) pour la MÊME séance
// désynchronisaient leur état React local (chacune sa propre lecture de
// localStorage au montage) : marquer une séance vue mettait bien à jour le
// stockage, mais pas l'icône du bouton d'onglet avant un rechargement.
export function useRoundSpoilerState(round) {
  const [store, setStore] = useState(null); // null tant que non hydraté côté client

  useEffect(() => {
    setStore(readStore());
  }, []);

  const hydrated = store !== null;

  const isWatched = useCallback(
    (session) => (hydrated ? isSessionWatched(store, round, session) : round < SPOILER_FROM_ROUND),
    [store, hydrated, round]
  );

  const markWatched = useCallback(
    (session) => {
      setStore((prev) => {
        const base = prev || readStore();
        const next = { ...base, [round]: { ...(base[round] || {}), [session]: true } };
        writeStore(next);
        return next;
      });
    },
    [round]
  );

  return { isWatched, markWatched, hydrated };
}

// Hook pour la page classement : calcule le round frontière parmi les
// rounds disponibles (ceux pour lesquels un classement existe en base).
export function useFrontierRound(availableRounds) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    setStore(readStore());
  }, []);

  const hydrated = store !== null;
  const frontier = hydrated
    ? frontierRound(store, availableRounds)
    : Math.max(SPOILER_FROM_ROUND - 1, ...availableRounds.filter((r) => r < SPOILER_FROM_ROUND));

  return { frontier, hydrated };
}
