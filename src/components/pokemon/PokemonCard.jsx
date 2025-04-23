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

const PokemonCard = ({
                       pokemon,
                       onClick,
                       favorites = [],
                       setFavorites = () => {},
                       compareList = [],
                       toggleCompare = () => {},
                     }) => {
  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType] || 'bg-white';
  const isFavorited = favorites.includes(pokemon.name);
  const isCompared = compareList.some((p) => p.id === pokemon.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    isFavorited
        ? setFavorites(favorites.filter((name) => name !== pokemon.name))
        : setFavorites([...favorites, pokemon.name]);
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    toggleCompare(pokemon);
  };

  return (
      <div
          onClick={() => onClick && onClick(pokemon)}
          className={`relative cursor-pointer holo-card text-gray-800 dark:text-white rounded-xl p-4 border flex flex-col items-center space-y-2 ${bgColor}`}
      >
        {/* Aligned Top Icons using flex */}
        <div className="absolute top-2 left-2 right-2 px-2 flex justify-between items-center z-10">
          {/* Compare Icon */}
          <button
              onClick={handleCompareClick}
              className={`text-2xl leading-none transition transform hover:scale-110 ${
                  isCompared
                      ? 'text-green-500 font-bold'
                      : 'text-gray-400 hover:text-green-400 opacity-80'
              }`}
              title="Select for Compare"
          >
            {isCompared ? '✔' : '⇄'}
          </button>

          {/* Favorite Star */}
          <button
              onClick={toggleFavorite}
              className={`text-3xl leading-none transition transform hover:scale-110 ${
                  isFavorited
                      ? 'text-yellow-400 drop-shadow'
                      : 'text-gray-400 hover:text-yellow-300 opacity-80'
              }`}
              title="Add to Favorites"
          >
            {isFavorited ? '★' : '☆'}
          </button>
        </div>

        {/* Artwork */}
        <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain poke-img"
        />

        {/* ID & Name */}
        <span className="text-sm bg-white/30 dark:bg-black/30 px-2 py-0.5 rounded-full">
        #{pokemon.id}
      </span>
        <h2 className="capitalize font-semibold text-lg bg-white/30 dark:bg-black/30 px-3 py-1 rounded-full">
          {pokemon.name}
        </h2>

        {/* Type Badges */}
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
