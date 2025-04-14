import { useEffect, useState } from 'react';
import axios from 'axios';

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

const PokemonModal = ({ pokemon, onClose, favorites, setFavorites }) => {
    const [currentPokemon, setCurrentPokemon] = useState(pokemon);
    const [flavorText, setFlavorText] = useState('');
    const [evolution, setEvolution] = useState([]);
    const [evoIndex, setEvoIndex] = useState(0);
    const [varieties, setVarieties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showShiny, setShowShiny] = useState(false);

    useEffect(() => {
        setCurrentPokemon(pokemon);
    }, [pokemon]);

    useEffect(() => {
        if (!currentPokemon) return;

        const fetchExtras = async () => {
            try {
                setLoading(true);
                const speciesRes = await axios.get(currentPokemon.species.url);
                const entry = speciesRes.data.flavor_text_entries.find((e) => e.language.name === 'en');
                setFlavorText(entry?.flavor_text.replace(/\f/g, ' ') || '');

                const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
                const evoData = evoRes.data.chain;
                const evoArray = [];
                let current = evoData;
                while (current) {
                    evoArray.push(current.species.name);
                    current = current.evolves_to[0];
                }
                setEvolution(evoArray);
                setEvoIndex(evoArray.findIndex(name => name === currentPokemon.name));

                const forms = await Promise.all(
                    speciesRes.data.varieties.map(async (variant) => {
                        const res = await axios.get(variant.pokemon.url);
                        const sprite =
                            res.data.sprites.other['official-artwork'].front_default || res.data.sprites.front_default;
                        return {
                            name: variant.pokemon.name,
                            image: sprite,
                        };
                    })
                );
                setVarieties(forms);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
                setShowShiny(false);
            }
        };

        fetchExtras();
    }, [currentPokemon]);

    useEffect(() => {
        const handleKey = async (e) => {
            if (e.key === 'ArrowLeft' && evoIndex > 0) {
                const name = evolution[evoIndex - 1];
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setCurrentPokemon(res.data);
            } else if (e.key === 'ArrowRight' && evoIndex < evolution.length - 1) {
                const name = evolution[evoIndex + 1];
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setCurrentPokemon(res.data);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [evoIndex, evolution, onClose]);

    if (!currentPokemon) return null;
    const primaryType = currentPokemon.types[0].type.name;
    const typeBg = typeColors[primaryType] || 'bg-gray-300';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-2">
            <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-5 text-xl font-bold text-gray-800 dark:text-white hover:scale-110 transition"
                    aria-label="Close Modal"
                >
                    ✕
                </button>

                {loading ? (
                    <p className="text-center">Loading Pokémon details...</p>
                ) : (
                    <>
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
                                        {currentPokemon.name} {showShiny && <span className="text-yellow-300 text-2xl">✨</span>}
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

                            {/* Shiny & Favorite buttons side-by-side */}
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

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p><strong>Height:</strong> {currentPokemon.height}</p>
                                <p><strong>Weight:</strong> {currentPokemon.weight}</p>
                                <p><strong>Base XP:</strong> {currentPokemon.base_experience}</p>
                            </div>
                            <div>
                                <p><strong>Abilities:</strong></p>
                                <ul className="list-disc list-inside">
                                    {currentPokemon.abilities.map((a) => (
                                        <li key={a.ability.name} className="capitalize">{a.ability.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mb-6">
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

                        {evolution.length > 1 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2 text-center">Evolution Chain</h2>
                                <div className="flex flex-wrap gap-6 items-center justify-center mb-4">
                                    {evolution.map((evoName) => (
                                        <div
                                            key={evoName}
                                            className="text-center cursor-pointer"
                                            onClick={async () => {
                                                try {
                                                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evoName}`);
                                                    setCurrentPokemon(res.data);
                                                } catch (err) {
                                                    console.error('Failed to load evolution:', err);
                                                }
                                            }}
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
                                        onClick={async () => {
                                            if (evoIndex > 0) {
                                                const name = evolution[evoIndex - 1];
                                                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                                                setCurrentPokemon(res.data);
                                            }
                                        }}
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
                                        onClick={async () => {
                                            if (evoIndex < evolution.length - 1) {
                                                const name = evolution[evoIndex + 1];
                                                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                                                setCurrentPokemon(res.data);
                                            }
                                        }}
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
                        )}

                        {varieties.length > 1 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Alternate Forms</h2>
                                <div className="flex flex-wrap gap-6 items-center justify-center">
                                    {varieties.map((form) => (
                                        <div
                                            key={form.name}
                                            className="text-center cursor-pointer"
                                            onClick={async () => {
                                                try {
                                                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${form.name}`);
                                                    setCurrentPokemon(res.data);
                                                } catch (err) {
                                                    console.error('Failed to load form:', err);
                                                }
                                            }}
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
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PokemonModal;
