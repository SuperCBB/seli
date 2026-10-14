import { useState } from 'react';
import Card from './Card';
import Sprite from './Sprite';
import EscapingButton from './EscapingButton';
import './Buttons.css';

// Cada paso es una pulsación del "Sí". Se acepta al completar el último.
const STEPS = [
  { question: '¿Quieres ser mi novia? 💜', yes: '¡SÍ!' },
  { question: '¿Seguro seguro? Pichu tiene dudas 🥺', yes: 'Sí...' },
  { question: 'Pichu no se lo cree, dilo otra vez ⚡', yes: '¡Que sí!' },
  { question: 'Casi casi... Pichu necesita más energía 🔋', yes: '¡SÍ, SÍ!' },
  { question: 'Última, que Pichu se está emocionando 💜', yes: '¡¡¡SÍ!!!' },
];

export default function ProposalCard({ onAccept }: { onAccept: () => void }) {
  const [clicks, setClicks] = useState(0);
  const step = STEPS[clicks];

  const handleYes = () => {
    if (clicks + 1 >= STEPS.length) {
      onAccept();
    } else {
      setClicks(clicks + 1);
    }
  };

  return (
    <Card>
      <h1>¡Un Pichu salvaje ha aparecido! ⚡</h1>
      <p>Trae un mensaje especial de mi parte (y viene con mucha energía)...</p>

      <Sprite alt="Pichu" shakeKey={clicks} />

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