import './Sprite.css';

// Sprites guardados en public/sprites (no dependen de ningún servidor externo)
const spriteUrl = (id: number) =>
  `${import.meta.env.BASE_URL}sprites/${id}.gif`;

type Props = {
  alt: string;
  pokemonId?: number; // 172 Pichu, 25 Pikachu, 26 Raichu
  shakeKey?: number;  // cambia para sacudir al Pokémon
  evolving?: boolean; // destello de evolución
};

export default function Sprite({ alt, pokemonId = 172, shakeKey = 0, evolving = false }: Props) {
  return (
    <div
      key={shakeKey}
      className={`sprite-container${shakeKey > 0 ? ' shake' : ''}`}
    >
      <img
        className={`sprite${evolving ? ' evolve' : ''}`}
        src={spriteUrl(pokemonId)}
        alt={alt}
      />
    </div>
  );
}
