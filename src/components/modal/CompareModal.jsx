import React from 'react';

const statColors = {
    hp: 'bg-red-500',
    attack: 'bg-orange-500',
    defense: 'bg-yellow-500',
    'special-attack': 'bg-blue-500',
    'special-defense': 'bg-indigo-500',
    speed: 'bg-green-500',
};

const CompareModal = ({ pokemonA, pokemonB, onClose, setCompareList }) => {
    const getStatValue = (pokemon, statName) =>
        pokemon.stats.find((s) => s.stat.name === statName)?.base_stat || 0;

    const allStats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-2">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white max-w-6xl w-full p-6 rounded-xl shadow-xl relative overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 bg-gray-300 dark:bg-gray-700 rounded-full text-gray-900 dark:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">Compare Pokémon</h2>

                <div className="flex justify-between items-center mb-4">
                    {[pokemonA, pokemonB].map((p, i) => (
                        <div key={i} className="text-center w-1/2">
                            <h3 className="text-xl font-semibold capitalize">{p.name}</h3>
                            <img
                                src={p.sprites.other['official-artwork'].front_default}
                                alt={p.name}
                                className="mx-auto h-40"
                            />
                            <button
                                onClick={() => setCompareList((prev) => prev.filter((poke) => poke.id !== p.id))}
                                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    {allStats.map((stat) => {
                        const valueA = getStatValue(pokemonA, stat);
                        const valueB = getStatValue(pokemonB, stat);
                        const max = Math.max(valueA, valueB);
                        const color = statColors[stat] || 'bg-gray-500';

                        return (
                            <div key={stat}>
                                <p className="capitalize text-base font-semibold mb-1 text-center">
                                    {stat.replace('-', ' ')}
                                </p>

                                <div className="flex gap-4 items-center">
                                    {/* Left Pokémon stat */}
                                    <div className="w-1/2 pr-2">
                                        <div className="relative h-6 bg-gray-300 dark:bg-gray-700 rounded flex flex-row-reverse">
                                            <div
                                                className={`h-full ${color} ${valueA === max ? 'opacity-100' : 'opacity-60'}`}
                                                style={{ width: `${(valueA / 200) * 100}%` }}
                                            />
                                            <span
                                                className={`absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-full text-sm font-bold ${
                                                    valueA === max
                                                        ? 'text-black dark:text-white'
                                                        : 'text-gray-600 dark:text-gray-300'
                                                }`}
                                                style={{ right: `${(valueA / 200) * 100}%`, paddingRight: '4px' }}
                                            >
      {valueA}
    </span>
                                        </div>
                                    </div>



                                    
                                    {/* Stat label */}
                                    <div className="w-10 text-center font-semibold text-sm text-gray-400">vs</div>

                                    {/* Right Pokémon stat */}
                                    <div className="w-1/2 pl-2">
                                        <div className="relative h-6 bg-gray-300 dark:bg-gray-700 rounded">
                                            <div
                                                className={`h-full ${color} ${valueB === max ? 'opacity-100' : 'opacity-60'}`}
                                                style={{ width: `${(valueB / 200) * 100}%` }}
                                            />
                                            <span
                                                className={`absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-full text-sm font-bold ${
                                                    valueA === max
                                                        ? 'text-black dark:text-white'
                                                        : 'text-gray-600 dark:text-gray-300'
                                                }`}
                                                style={{ left: `${(valueB / 200) * 100}%`, paddingLeft: '4px' }}
                                            >
      {valueB}
    </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CompareModal;
