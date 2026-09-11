// "Pick de PTW" — pronostic du site pour le vainqueur de chaque course,
// écrit à la main avant le week-end (même logique éditoriale que les
// Pré-analyses, cf. `preanalyse-fr.js` par round : c'est un avis assumé par
// l'auteur, pas une donnée ingérée ni générée) puis confronté
// automatiquement au résultat réel une fois la course disputée (cf.
// getRaceWinners dans raceData.js, utilisé par RawDataTab et par le bilan
// de saison dans RaceTabs.jsx).
//
// Volontairement un simple objet {round: family_name}, pas un fichier par
// round comme PREANALYSE_*_HTML : la seule chose qui compte est le nom du
// pilote, comparé au résultat — rien à rédiger en double. `family_name`
// doit correspondre EXACTEMENT à celui utilisé dans `results`/`drivers`
// (ex. "Verstappen", "Norris", pas le prénom ni le nom complet), sans quoi
// la comparaison échoue silencieusement (pick jamais marqué correct).
//
// Ajouter une entrée avant chaque week-end, par exemple :
//   14: "Norris",
export const PTW_PICKS = {
};
