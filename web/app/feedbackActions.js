"use server";

// Server Action plutôt qu'une route /api, même raisonnement que
// telemetryActions.js : pas de backend séparé dans ce projet. Appelée
// depuis FeedbackButton (Client Component) à la soumission du formulaire.
import { insertFeedback } from "../lib/feedback";

export async function submitFeedback({ type, message, contactEmail, pageUrl }) {
  await insertFeedback({ type, message, contactEmail, pageUrl });
}
