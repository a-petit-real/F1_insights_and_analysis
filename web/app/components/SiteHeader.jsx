"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLangPref } from "../../lib/langPref";

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
  const { lang, hydrated, toggle } = useLangPref();
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
        <button
          type="button"
          className="langtoggle"
          onClick={toggle}
          aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
          title={hydrated ? (lang === "en" ? "Switch to French" : "Passer en anglais") : undefined}
        >
          <svg className="wheel-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3.5" y="7" width="17" height="12.5" rx="5" />
            <path d="M8.5 7 Q12 3 15.5 7" />
            <circle cx="12" cy="13.5" r="1.7" />
            <path d="M12 13.5 L6.5 17" />
            <path d="M12 13.5 L17.5 17" />
            <circle cx="7" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="17" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
          </svg>
          <span className="langlabel">{hydrated ? lang.toUpperCase() : "FR"}</span>
        </button>
      </div>
    </header>
  );
}
