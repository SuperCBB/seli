import { useEffect, useState } from 'react';
import Card from './Card';
import Sprite from './Sprite';
import { CONFIG } from '../config';

const PHOTO_URL = `${import.meta.env.BASE_URL}${CONFIG.photo}`;

function sinceText(date: Date): string {
  const day = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `💜 Novios desde el ${day} a las ${time}`;
}

export default function SuccessCard({ acceptedAt }: { acceptedAt: Date }) {
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

      <p className="since">{sinceText(acceptedAt)}</p>
    </Card>
  );
}
