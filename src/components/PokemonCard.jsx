import { Link } from 'react-router-dom';

/**
 * Farver til forskellige Pokémon-typer (Tailwind utility-klasser)
 */
const typeColors = {
  grass: 'bg-green-200',
  fire: 'bg-orange-300',
  water: 'bg-blue-200',
  electric: 'bg-yellow-200',
  bug: 'bg-lime-200',
  normal: 'bg-gray-200',
  poison: 'bg-purple-200',
  ground: 'bg-yellow-300',
  fairy: 'bg-pink-200',
  fighting: 'bg-red-300',
  psychic: 'bg-pink-300',
  rock: 'bg-yellow-400',
  ghost: 'bg-indigo-300',
  ice: 'bg-blue-100',
  dragon: 'bg-indigo-400',
  dark: 'bg-gray-600 text-white',
  steel: 'bg-gray-300',
  flying: 'bg-sky-200',
};

/**
 * PokemonCard Component
 * ---------------------
 * Viser et enkelt Pokémon-kort med navn, ID, billede og type-badges.
 * Kortet linker til en detaljeret side via React Router.
 *
 * Props:
 * - pokemon: Objekt med detaljer om en enkelt Pokémon
 */

const PokemonCard = ({ pokemon }) => {
  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType] || 'bg-white';

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="holo-card-wrapper">
      <div
        className={`holo-card text-gray-800 dark:text-white rounded-xl p-4 border flex flex-col items-center space-y-2 ${bgColor}`}
      >
        {/* Billede */}
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-32 h-32 object-contain poke-img"
        />

        {/* Pokémon ID (nummer) */}
        <span className="text-sm bg-white/30 dark:bg-black/30 px-2 py-0.5 rounded-full">
          #{pokemon.id}
        </span>

        {/* Pokémon Navn */}
        <h2 className="capitalize font-semibold text-lg bg-white/30 dark:bg-black/30 px-3 py-1 rounded-full">
          {pokemon.name}
        </h2>

        {/* Type-badges */}
        <div className="flex gap-2 mt-1">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="text-xs px-2 py-0.5 bg-white/30 dark:bg-black/30 rounded-full capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
