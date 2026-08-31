import './globals.css';

export const metadata = {
  title: 'The Pit Wall',
  description:
    "Analyses F1 : debrief complet de la dernière course et pré-analyse du prochain Grand Prix.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
