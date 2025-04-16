const PokemonStats = ({ currentPokemon, primaryType, typeColors }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p>
            <strong>Height:</strong> {currentPokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {currentPokemon.weight}
          </p>
          <p>
            <strong>Base XP:</strong> {currentPokemon.base_experience}
          </p>
        </div>
        <div>
          <p>
            <strong>Abilities:</strong>
          </p>
          <ul className="list-disc list-inside">
            {currentPokemon.abilities.map((a) => (
              <li key={a.ability.name} className="capitalize">
                {a.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Stats</h2>
      <div className="space-y-2">
        {currentPokemon.stats.map((stat) => (
          <div key={stat.stat.name}>
            <div className="flex justify-between text-sm">
              <span className="capitalize">{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-3">
              <div
                className={`h-3 rounded ${typeColors[primaryType]}`}
                style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
