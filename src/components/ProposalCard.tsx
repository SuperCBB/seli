import { useState } from 'react';
import Card from './Card';
import Sprite from './Sprite';
import EscapingButton from './EscapingButton';
import { CONFIG } from '../config';
import './Buttons.css';

// Cada paso es una pulsación del "Sí". Se acepta al completar el último.
const STEPS = [
  { question: '¿Quieres ser mi novia? 💜', yes: '¡SÍ!' },
  { question: '¿Seguro seguro? Pichu tiene dudas 🥺', yes: 'Sí...' },
  { question: 'Pikachu se enamoró en Andorra 🏔️ ¿Y tú, lo estás?', yes: '¡Que sí!' },
  { question: 'Casi casi... Pikachu necesita más energía 🔋', yes: '¡SÍ, SÍ!' },
  { question: 'Última, que Raichu se está emocionando 💜', yes: '¡¡¡SÍ!!!' },
];

// Evolución según el número de pulsaciones
function stageFor(clicks: number) {
  if (clicks >= 4) return { id: 26, name: 'Raichu', title: '¡Pikachu ha evolucionado a Raichu! ⚡' };
  if (clicks >= 2) return { id: 25, name: 'Pikachu', title: '¡Pichu ha evolucionado a Pikachu! ⚡' };
  return { id: 172, name: 'Pichu', title: '¡Un Pichu salvaje ha aparecido! ⚡' };
}

export default function ProposalCard({ onAccept }: { onAccept: () => void }) {
  const [clicks, setClicks] = useState(0);
  const step = STEPS[clicks];
  const stage = stageFor(clicks);
  const evolving = clicks === 2 || clicks === 4;

  const handleYes = () => {
    if (clicks + 1 >= STEPS.length) {
      onAccept();
    } else {
      setClicks(clicks + 1);
    }
  };

  const intro = CONFIG.herName
    ? `Trae un mensaje especial para ti, ${CONFIG.herName} (y viene con mucha energía)...`
    : 'Trae un mensaje especial de mi parte (y viene con mucha energía)...';

  return (
    <Card>
      <h1 key={stage.id} className="pop">{stage.title}</h1>
      <p>{intro}</p>

      <Sprite
        alt={stage.name}
        pokemonId={stage.id}
        shakeKey={clicks}
        evolving={evolving}
      />

      <div className="energy" aria-hidden="true">
        <div
          className="energy-fill"
          style={{ width: `${(clicks / STEPS.length) * 100}%` }}
        />
      </div>

      <p key={clicks} className="question pop">
        {step.question}
      </p>

      <div className="btn-container">
        <button
          className="btn btn-yes"
          style={{ ['--grow' as string]: 1 + clicks * 0.08 }}
          onClick={handleYes}
        >
          {step.yes}
        </button>
        <EscapingButton>No</EscapingButton>
      </div>
    </Card>
  );
}
