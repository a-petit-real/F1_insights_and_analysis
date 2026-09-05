// Coordonnées approximatives des circuits (pour la vue carte du calendrier)
// et emoji drapeau du pays hôte. Clé = circuits.name en base — statique
// car ces informations ne changent jamais d'une saison à l'autre pour un
// circuit donné, inutile d'aller les chercher ailleurs.
export const CIRCUIT_GEO = {
  "Albert Park Grand Prix Circuit": { lat: -37.8136, lon: 144.9631, flag: "🇦🇺" },
  "Shanghai International Circuit": { lat: 31.1443, lon: 121.5397, flag: "🇨🇳" },
  "Suzuka Circuit": { lat: 34.8431, lon: 136.5410, flag: "🇯🇵" },
  "Miami International Autodrome": { lat: 25.9581, lon: -80.2389, flag: "🇺🇸" },
  "Circuit Gilles Villeneuve": { lat: 45.5000, lon: -73.5228, flag: "🇨🇦" },
  "Circuit de Monaco": { lat: 43.7347, lon: 7.4206, flag: "🇲🇨" },
  "Circuit de Barcelona-Catalunya": { lat: 41.5700, lon: 2.2611, flag: "🇪🇸" },
  "Red Bull Ring": { lat: 47.2197, lon: 14.7647, flag: "🇦🇹" },
  "Silverstone Circuit": { lat: 52.0786, lon: -1.0169, flag: "🇬🇧" },
  "Circuit de Spa-Francorchamps": { lat: 50.4372, lon: 5.9714, flag: "🇧🇪" },
  "Hungaroring": { lat: 47.5789, lon: 19.2486, flag: "🇭🇺" },
  "Circuit Park Zandvoort": { lat: 52.3888, lon: 4.5409, flag: "🇳🇱" },
  "Autodromo Nazionale di Monza": { lat: 45.6156, lon: 9.2811, flag: "🇮🇹" },
  "Madring": { lat: 40.4400, lon: -3.6100, flag: "🇪🇸" },
  "Baku City Circuit": { lat: 40.3725, lon: 49.8532, flag: "🇦🇿" },
  "Sepang International Circuit": { lat: 2.7608, lon: 101.7383, flag: "🇲🇾" },
  "Marina Bay Street Circuit": { lat: 1.2914, lon: 103.8640, flag: "🇸🇬" },
  "Circuit of the Americas": { lat: 30.1328, lon: -97.6411, flag: "🇺🇸" },
  "Autódromo Hermanos Rodríguez": { lat: 19.4042, lon: -99.0907, flag: "🇲🇽" },
  "Autódromo José Carlos Pace": { lat: -23.7036, lon: -46.6997, flag: "🇧🇷" },
  "Las Vegas Strip Street Circuit": { lat: 36.1147, lon: -115.1728, flag: "🇺🇸" },
  "Losail International Circuit": { lat: 25.4900, lon: 51.4542, flag: "🇶🇦" },
  "Yas Marina Circuit": { lat: 24.4672, lon: 54.6031, flag: "🇦🇪" },
};

// Repli neutre pour un circuit pas encore répertorié ci-dessus (nouveau
// tracé ajouté au calendrier) plutôt que de faire planter la carte.
export const FALLBACK_GEO = { lat: 0, lon: 0, flag: "🏁" };

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
