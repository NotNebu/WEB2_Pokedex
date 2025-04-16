const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-800',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const PokemonHeader = ({
  currentPokemon,
  showShiny,
  setShowShiny,
  flavorText,
  favorites,
  setFavorites,
}) => {
  const primaryType = currentPokemon.types[0].type.name;
  const typeBg = typeColors[primaryType] || 'bg-gray-300';

  return (
    <div className={`rounded-xl p-6 mb-6 ${typeBg} text-white shadow-lg`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={
            showShiny
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${currentPokemon.id}.png`
              : currentPokemon.sprites.other['official-artwork'].front_default
          }
          alt={currentPokemon.name}
          className="w-60 h-60"
        />
        <div>
          <h1 className="text-4xl font-bold capitalize">
            {currentPokemon.name}{' '}
            {showShiny && <span className="text-yellow-300 text-2xl">✨</span>}
          </h1>
          <p>ID: {currentPokemon.id}</p>
          <div className="flex gap-2 mt-2">
            {currentPokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-2 py-1 bg-white/20 rounded text-sm capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <p className="mt-4 italic">{flavorText}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 text-center">
        <button
          onClick={() => setShowShiny(!showShiny)}
          className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded font-semibold shadow w-full sm:w-auto"
        >
          {showShiny ? 'Show Normal' : 'Show Shiny ✨'}
        </button>

        <button
          onClick={() => {
            const name = currentPokemon.name;
            if (favorites.includes(name)) {
              setFavorites(favorites.filter((f) => f !== name));
            } else {
              setFavorites([...favorites, name]);
            }
          }}
          className={`px-4 py-2 rounded font-semibold shadow w-full sm:w-auto ${
            favorites.includes(currentPokemon.name)
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-300 dark:bg-gray-700 text-white'
          }`}
        >
          {favorites.includes(currentPokemon.name) ? '★ Favorited' : '☆ Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default PokemonHeader;
