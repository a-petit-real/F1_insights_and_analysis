"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { submitFeedback } from "../feedbackActions";

// Bouton "Feedback" du header + sa modale — maquette validée par
// l'utilisateur (option A : icône header, même gabarit que le sélecteur
// FR/EN ; option D/E : modale claire/sombre suivant le thème du site).
// <dialog> natif plutôt qu'un overlay maison : gère nativement Échap,
// le piège de focus et le fond (::backdrop, stylé dans globals.css) sans
// code de gestion de focus à écrire/maintenir ici.
const TYPES = [
  { value: "bug", label: "Bug" },
  { value: "idee", label: "Idée" },
  { value: "question", label: "Question" },
];

export default function FeedbackButton() {
  const dialogRef = useRef(null);
  const pathname = usePathname();
  const [type, setType] = useState("idee");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  function openDialog() {
    setError(null);
    dialogRef.current?.showModal();
  }

  function closeAndReset() {
    dialogRef.current?.close();
    setType("idee");
    setMessage("");
    setEmail("");
    setError(null);
    setSent(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    submitFeedback({ type, message, contactEmail: email, pageUrl: pathname })
      .then(() => {
        setSubmitting(false);
        setSent(true);
        setTimeout(closeAndReset, 1400);
      })
      .catch(() => {
        setSubmitting(false);
        setError("Échec de l'envoi — réessaie dans un instant.");
      });
  }

  return (
    <>
      <button
        type="button"
        className="langtoggle"
        onClick={openDialog}
        aria-label="Proposer une amélioration"
        title="Proposer une amélioration"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 5.5h15a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H10l-4 3.2c-.33.26-.8.02-.8-.4V16H4.5a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
          <path d="M8 9.7h8M8 12.7h4.5" />
        </svg>
        <span className="langlabel">Feedback</span>
      </button>

      <dialog ref={dialogRef} className="fbdialog" onCancel={closeAndReset} onClose={closeAndReset}>
        {sent ? (
          <p className="fbsent">Merci, c'est envoyé.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="fbhead">
              <h3 className="fbtitle">Proposer une amélioration</h3>
              <button type="button" className="fbclose" onClick={closeAndReset} aria-label="Fermer">×</button>
            </div>
            <p className="fbsub">Bug, idée ou question — deux champs suffisent.</p>

            <div className="fbtyperow" role="radiogroup" aria-label="Type de retour">
              {TYPES.map((t) => (
                <label key={t.value} className={"fbtypechip" + (type === t.value ? " selected" : "")}>
                  <input
                    type="radio"
                    name="fbtype"
                    value={t.value}
                    checked={type === t.value}
                    onChange={() => setType(t.value)}
                  />
                  {t.label}
                </label>
              ))}
            </div>

            <div className="fbfield">
              <label className="fbfieldlabel" htmlFor="fbmessage">Ton message</label>
              <textarea
                id="fbmessage"
                className="fbtextarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2000}
                required
                autoFocus
              />
            </div>

            <div className="fbfield">
              <label className="fbfieldlabel" htmlFor="fbemail">Email (optionnel, pour te recontacter)</label>
              <input
                id="fbemail"
                type="email"
                className="fbinput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="toi@exemple.com"
              />
            </div>

            {error && <p className="fberror">{error}</p>}

            <div className="fbfoot">
              <button type="button" className="fbbtn fbbtn-ghost" onClick={closeAndReset}>Annuler</button>
              <button type="submit" className="fbbtn fbbtn-primary" disabled={submitting || !message.trim()}>
                {submitting ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
