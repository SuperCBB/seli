import Card from './Card';
import Sprite from './Sprite';

export default function SuccessCard() {
  return (
    <Card>
      <h1>¡Felicidades! 🎉</h1>
      <p>¡Has atrapado a tu novio programador ideal!</p>

      <Sprite alt="Pichu feliz" />

      <p className="promise">
        ¡Prometo ser tu mejor compañero de equipo por siempre! ✨
      </p>

      <p className="catchphrase">¡Qué tío! 😏</p>
    </Card>
  );
}