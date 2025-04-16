import axios from 'axios';

const PokemonEvolution = ({ currentPokemon, evolution, evoIndex, setCurrentPokemon }) => {
  const loadPokemon = async (name) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setCurrentPokemon(res.data);
    } catch (err) {
      console.error('Failed to load evolution:', err);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-center">Evolution Chain</h2>

      <div className="flex flex-wrap gap-6 items-center justify-center mb-4">
        {evolution.map((evoName) => (
          <div
            key={evoName}
            className="text-center cursor-pointer"
            onClick={() => loadPokemon(evoName)}
          >
            <img
              src={`https://img.pokemondb.net/artwork/large/${evoName}.jpg`}
              alt={evoName}
              className={`w-24 h-24 object-contain mx-auto rounded-lg border-4 ${
                evoName === currentPokemon.name
                  ? 'border-yellow-400 shadow-lg scale-105'
                  : 'border-transparent'
              }`}
            />
            <span className="capitalize mt-2 block">{evoName}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => loadPokemon(evolution[evoIndex - 1])}
          disabled={evoIndex <= 0}
          className={`px-4 py-2 rounded font-semibold shadow ${
            evoIndex <= 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          ← Previous
        </button>

        <button
          onClick={() => loadPokemon(evolution[evoIndex + 1])}
          disabled={evoIndex >= evolution.length - 1}
          className={`px-4 py-2 rounded font-semibold shadow ${
            evoIndex >= evolution.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PokemonEvolution;
