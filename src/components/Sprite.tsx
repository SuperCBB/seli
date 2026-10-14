import './Sprite.css';

const PICHU_SPRITE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/172.gif';

export default function Sprite({ alt }: { alt: string }) {
  return (
    <div className="sprite-container">
      <img className="sprite" src={PICHU_SPRITE} alt={alt} />
    </div>
  );
}
