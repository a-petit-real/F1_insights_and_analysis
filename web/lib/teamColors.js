// Couleurs d'écurie — petits repères d'identité visuelle, pas des logos.
// Reprises telles quelles depuis l'ancien pitwall-behavior.js (qui ne
// tournait que sur l'accueil) pour que le tableau de bord et les pages de
// course partagent le même code couleur.
export const TEAM_COLORS = {
  McLaren: "#FF8000",
  Mercedes: "#00A19B",
  Ferrari: "#E8002D",
  "Red Bull": "#1B3A93",
  Williams: "#00A3E0",
  Audi: "#B01030",
  "Aston Martin": "#229971",
  Alpine: "#FF87BC",
  "Racing Bulls": "#6C98FF",
  Cadillac: "#C9A24B",
  Haas: "#9AA0AC",
};

export function teamColor(team) {
  return TEAM_COLORS[team] || "#8A8F99";
}
