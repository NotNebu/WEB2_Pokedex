import axios from 'axios';

const PokemonVarieties = ({ varieties, currentPokemon, setCurrentPokemon }) => {
  const handleClick = async (formName) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${formName}`);
      setCurrentPokemon(res.data);
    } catch (err) {
      console.error('Failed to load form:', err);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Alternate Forms</h2>
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {varieties.map((form) => (
          <div
            key={form.name}
            className="text-center cursor-pointer"
            onClick={() => handleClick(form.name)}
          >
            <img
              src={form.image}
              alt={form.name}
              className={`w-24 h-24 object-contain mx-auto rounded-lg transition border-2 ${
                form.name === currentPokemon.name
                  ? 'border-yellow-400 shadow scale-105'
                  : 'border-transparent'
              }`}
            />
            <span className="capitalize mt-2 block">{form.name.replace(/-/g, ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonVarieties;
