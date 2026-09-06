// Coordonnées approximatives des circuits (pour la vue carte du calendrier)
// et code pays du plateau de télé F1 (3 lettres). Clé = circuits.name en
// base — statique car ces informations ne changent jamais d'une saison à
// l'autre pour un circuit donné, inutile d'aller les chercher ailleurs.
//
// Code plutôt qu'emoji drapeau : un drapeau emoji est une paire de
// caractères "regional indicator" — sans police couleur adéquate (Windows
// sans Segoe UI Emoji à jour, certains Android), le rendu se dégrade en un
// pavé illisible avec le code pays écrit dedans. Le code écrit nous-mêmes,
// en Plex Mono, est garanti identique partout — et c'est justement le
// format déjà utilisé sur les écrans de timing F1, donc cohérent avec le
// reste de l'habillage du site plutôt qu'un simple repli technique.
export const CIRCUIT_GEO = {
  "Albert Park Grand Prix Circuit": { lat: -37.8136, lon: 144.9631, code: "AUS" },
  "Shanghai International Circuit": { lat: 31.1443, lon: 121.5397, code: "CHN" },
  "Suzuka Circuit": { lat: 34.8431, lon: 136.5410, code: "JPN" },
  "Miami International Autodrome": { lat: 25.9581, lon: -80.2389, code: "USA" },
  "Circuit Gilles Villeneuve": { lat: 45.5000, lon: -73.5228, code: "CAN" },
  "Circuit de Monaco": { lat: 43.7347, lon: 7.4206, code: "MON" },
  "Circuit de Barcelona-Catalunya": { lat: 41.5700, lon: 2.2611, code: "ESP" },
  "Red Bull Ring": { lat: 47.2197, lon: 14.7647, code: "AUT" },
  "Silverstone Circuit": { lat: 52.0786, lon: -1.0169, code: "GBR" },
  "Circuit de Spa-Francorchamps": { lat: 50.4372, lon: 5.9714, code: "BEL" },
  "Hungaroring": { lat: 47.5789, lon: 19.2486, code: "HUN" },
  "Circuit Park Zandvoort": { lat: 52.3888, lon: 4.5409, code: "NED" },
  "Autodromo Nazionale di Monza": { lat: 45.6156, lon: 9.2811, code: "ITA" },
  "Madring": { lat: 40.4400, lon: -3.6100, code: "ESP" },
  "Baku City Circuit": { lat: 40.3725, lon: 49.8532, code: "AZE" },
  "Sepang International Circuit": { lat: 2.7608, lon: 101.7383, code: "MAL" },
  "Marina Bay Street Circuit": { lat: 1.2914, lon: 103.8640, code: "SGP" },
  "Circuit of the Americas": { lat: 30.1328, lon: -97.6411, code: "USA" },
  "Autódromo Hermanos Rodríguez": { lat: 19.4042, lon: -99.0907, code: "MEX" },
  "Autódromo José Carlos Pace": { lat: -23.7036, lon: -46.6997, code: "BRA" },
  "Las Vegas Strip Street Circuit": { lat: 36.1147, lon: -115.1728, code: "USA" },
  "Losail International Circuit": { lat: 25.4900, lon: 51.4542, code: "QAT" },
  "Yas Marina Circuit": { lat: 24.4672, lon: 54.6031, code: "UAE" },
};

// Repli neutre pour un circuit pas encore répertorié ci-dessus (nouveau
// tracé ajouté au calendrier) plutôt que de faire planter la carte.
export const FALLBACK_GEO = { lat: 0, lon: 0, code: "—" };

// Un round est "disputé" une fois sa date passée, "en cours" dans les deux
// jours qui précèdent la course (couvre le week-end EL1/EL2/EL3/Quali sans
// avoir besoin d'aller vérifier si les résultats existent déjà en base), et
// "à venir" au-delà.
export function raceStatus(raceDateStr, today = new Date()) {
  const cutoff = new Date(today);
  cutoff.setHours(0, 0, 0, 0);
  const raceDate = new Date(raceDateStr);
  const diffDays = Math.round((raceDate - cutoff) / 86400000);
  if (diffDays < 0) return "done";
  if (diffDays <= 2) return "live";
  return "upcoming";
}
