/**
 * PokemonCard Component
 * ---------------------
 * Viser et enkelt Pokémon-kort med navn, ID, billede og type-badges.
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

const PokemonCard = ({ pokemon, onClick, favorites = [], setFavorites = () => {} }) => {
  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType] || 'bg-white';
  const isFavorited = favorites.includes(pokemon.name);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Undgå at åbne modal når man klikker stjernen
    if (isFavorited) {
      setFavorites(favorites.filter((name) => name !== pokemon.name));
    } else {
      setFavorites([...favorites, pokemon.name]);
    }
  };

  return (
      <div
          onClick={() => onClick && onClick(pokemon)}
          className={`relative cursor-pointer holo-card text-gray-800 dark:text-white rounded-xl p-4 border flex flex-col items-center space-y-2 ${bgColor}`}
      >
        {/* Stjerne */}
        <div
            className={`absolute top-2 right-2 text-3xl md:text-4xl z-10 cursor-pointer transition transform hover:scale-110 ${
                isFavorited ? 'text-yellow-400 drop-shadow' : 'text-gray-400 hover:text-yellow-300 opacity-80'
            }`}
            onClick={toggleFavorite}
        >
          {isFavorited ? '★' : '☆'}
        </div>
        
        <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain poke-img"
        />

        <span className="text-sm bg-white/30 dark:bg-black/30 px-2 py-0.5 rounded-full">
        #{pokemon.id}
      </span>

        <h2 className="capitalize font-semibold text-lg bg-white/30 dark:bg-black/30 px-3 py-1 rounded-full">
          {pokemon.name}
        </h2>

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
  );
};

export default PokemonCard;
