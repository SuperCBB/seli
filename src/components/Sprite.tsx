import './Sprite.css';

const PICHU_SPRITE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/172.gif';

type Props = { alt: string; shakeKey?: number };

export default function Sprite({ alt, shakeKey = 0 }: Props) {
  return (
    <div
      key={shakeKey}
      className={`sprite-container${shakeKey > 0 ? ' shake' : ''}`}
    >
      <img className="sprite" src={PICHU_SPRITE} alt={alt} />
    </div>
  );
}