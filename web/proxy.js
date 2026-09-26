// Journalise chaque visite (IP, géolocalisation Vercel, user-agent) pour
// le récap quotidien de fréquentation demandé par l'utilisateur — voir
// lib/visitLog.js et docs/OPERATIONS.md. Proxy (ex-"middleware", renommé
// en Next.js 16 — https://nextjs.org/docs/messages/middleware-to-proxy)
// tourne toujours en runtime Node.js, ce qui permet à lib/db.js d'utiliser
// le driver `pg` en TCP (indisponible sur Edge).
//
// event.waitUntil laisse l'écriture DB se terminer après l'envoi de la
// réponse : aucune latence ajoutée pour le visiteur.
import { NextResponse } from "next/server";
import { logVisit } from "./lib/visitLog";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

export function proxy(request, event) {
  event.waitUntil(logVisit(request));
  return NextResponse.next();
}
