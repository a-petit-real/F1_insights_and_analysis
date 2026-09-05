"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// En-tête partagé par toutes les pages (accueil, courses, classement) —
// remplace le bandeau qui n'existait jusqu'ici qu'à l'intérieur du HTML
// figé de la page d'accueil (content.js), et qui laissait toutes les
// autres pages sans identité ni navigation cohérente.
//
// Trois vrais liens plutôt que le mélange précédent d'onglets JS
// ("Dernière course"/"Prochain GP", qui changeaient le contenu sur place)
// et de liens ("Toutes les courses"/"Classement", qui changeaient de
// page) : les quatre boutons se comportaient différemment sans que rien
// ne le distingue visuellement. Ici, tout est une vraie navigation —
// l'accueil lui-même est devenu un tableau de bord qui pointe vers le
// dernier résultat et le prochain GP (cf. app/page.jsx).
const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/courses", label: "Courses" },
  { href: "/classement", label: "Classement" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link href="/" className="wordmark" style={{ textDecoration: "none", color: "inherit" }}>
          The <span>Pit</span> Wall
        </Link>
        <nav className="tabs" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="tabbtn"
                aria-selected={active}
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
