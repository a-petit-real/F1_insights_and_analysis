'use client';

import { useEffect } from 'react';
import { PAGE_BODY_HTML } from './content';
import { initPitWall } from './pitwall-behavior';

export default function HomePage() {
  useEffect(() => {
    const cleanup = initPitWall();
    return cleanup;
  }, []);

  // Contenu porté tel quel depuis la maquette validée ; l'effet ci-dessus
  // rebranche l'interactivité (onglets, sommaire, aperçus de lien...) une
  // fois le HTML monté.
  return <div dangerouslySetInnerHTML={{ __html: PAGE_BODY_HTML }} />;
}
