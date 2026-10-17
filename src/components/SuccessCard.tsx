import { useEffect, useState } from 'react';
import Card from './Card';
import Sprite from './Sprite';
import { CONFIG } from '../config';

const PHOTO_URL = `${import.meta.env.BASE_URL}${CONFIG.photo}`;

// Se calcula una sola vez, fuera del render
function sinceText(): string | null {
  if (!CONFIG.sinceDate) return null;
  const start = new Date(`${CONFIG.sinceDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;
  const days = Math.floor((Date.now() - start.getTime()) / 86_400_000);
  const pretty = start.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  if (days <= 0) return `💜 Novios desde hoy, ${pretty}`;
  return `💜 Novios desde el ${pretty} · ${days} ${days === 1 ? 'día' : 'días'} juntos`;
}
const SINCE = sinceText();

export default function SuccessCard() {
  const [photoOk, setPhotoOk] = useState(true);

  // En esta pantalla sí se puede hacer scroll (la tarjeta puede ser alta en móvil)
  useEffect(() => {
    document.body.style.overflowY = 'auto';
    document.body.style.touchAction = 'auto';
    return () => {
      document.body.style.overflowY = '';
      document.body.style.touchAction = '';
    };
  }, []);

  return (
    <Card>
      <h1>¡Felicidades{CONFIG.herName ? `, ${CONFIG.herName}` : ''}! 🎉</h1>
      <p>¡Has atrapado a tu novio programador ideal!</p>

      <Sprite alt="Raichu feliz" pokemonId={26} evolving />

      {photoOk && (
        <img
          className="photo"
          src={PHOTO_URL}
          alt="Nosotros"
          onError={() => setPhotoOk(false)}
        />
      )}

      <p className="promise">
        ¡Prometo ser tu mejor compañero de equipo por siempre! ✨
      </p>

      <p className="catchphrase">¡Qué tío! 😏</p>

      {SINCE && <p className="since">{SINCE}</p>}
    </Card>
  );
}
