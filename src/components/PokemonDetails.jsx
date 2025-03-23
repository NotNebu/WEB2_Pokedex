import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

/**
 * Farver til stat-bar baseret på Pokémon-typen
 */
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
}

const PokemonDetails = () => {
    const { name } = useParams()
    const navigate = useNavigate()

    const [pokemon, setPokemon] = useState(null)
    const [flavorText, setFlavorText] = useState('')
    const [evolution, setEvolution] = useState([])
    const [varieties, setVarieties] = useState([])
    const [loading, setLoading] = useState(true)
    const [fade, setFade] = useState(false)
    const [showShiny, setShowShiny] = useState(false)

    // Hent detaljeret data om Pokémon ved navn
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true)

                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const data = res.data
                setPokemon(data)

                // Fetch flavor text fra species
                const speciesRes = await axios.get(data.species.url)
                const entry = speciesRes.data.flavor_text_entries.find(e => e.language.name === 'en')
                setFlavorText(entry?.flavor_text.replace(/\f/g, ' ') || '')

                // Evolution chain
                const evoRes = await axios.get(speciesRes.data.evolution_chain.url)
                const evoData = evoRes.data.chain
                const evoArray = []
                let current = evoData
                while (current) {
                    evoArray.push(current.species.name)
                    current = current.evolves_to[0]
                }
                setEvolution(evoArray)

                // Alternate forms
                const fetchedVarieties = await Promise.all(
                    speciesRes.data.varieties.map(async (variant) => {
                        const res = await axios.get(variant.pokemon.url)
                        const sprite =
                            res.data.sprites.other['official-artwork'].front_default ||
                            res.data.sprites.front_default ||
                            ''
                        return {
                            name: variant.pokemon.name,
                            image: sprite,
                        }
                    })
                )
                setVarieties(fetchedVarieties)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchDetails()
    }, [name])

    // Fade animation på skift af Pokémon
    useEffect(() => {
        setFade(false)
        const timeout = setTimeout(() => setFade(true), 50)
        return () => clearTimeout(timeout)
    }, [pokemon?.id])

    if (loading || !pokemon) return <p className="text-center mt-10">Loading Pokémon details...</p>

    const primaryType = pokemon.types[0].type.name
    const typeBg = typeColors[primaryType] || 'bg-gray-300'

    const currentIndex = evolution.findIndex(evo => evo === name)
    const prevEvo = evolution[currentIndex - 1]
    const nextEvo = evolution[currentIndex + 1]

    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-white">
            <Link to="/pokedex" className="text-blue-500 hover:underline block mb-4">
                ← Back to Pokédex
            </Link>

            <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className={`rounded-xl p-6 mb-6 ${typeBg} text-white shadow-lg`}>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={
                                showShiny
                                    ? pokemon.sprites.front_shiny
                                    : pokemon.sprites.other['official-artwork'].front_default
                            }
                            alt={pokemon.name}
                            className="w-60 h-60"
                        />
                        <div>
                            <h1 className="text-4xl font-bold capitalize">
                                {pokemon.name} {showShiny && <span className="text-yellow-300 text-2xl">✨</span>}
                            </h1>
                            <p className="text-white/80">ID: {pokemon.id}</p>
                            <div className="flex gap-2 mt-2">
                                {pokemon.types.map((type) => (
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

                    {/* Shiny Toggle */}
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowShiny(!showShiny)}
                            className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded font-semibold shadow"
                        >
                            {showShiny ? 'Show Normal' : 'Show Shiny ✨'}
                        </button>
                    </div>
                </div>

                {/* General Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p><strong>Height:</strong> {pokemon.height}</p>
                        <p><strong>Weight:</strong> {pokemon.weight}</p>
                        <p><strong>Base XP:</strong> {pokemon.base_experience}</p>
                    </div>
                    <div>
                        <p><strong>Abilities:</strong></p>
                        <ul className="list-disc list-inside">
                            {pokemon.abilities.map((a) => (
                                <li key={a.ability.name} className="capitalize">{a.ability.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Stats</h2>
                    <div className="space-y-2">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.stat.name}>
                                <div className="flex justify-between text-sm">
                                    <span className="capitalize">{stat.stat.name}</span>
                                    <span>{stat.base_stat}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded h-3">
                                    <div
                                        className={`h-3 rounded ${typeColors[primaryType] || 'bg-gray-500'}`}
                                        style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Moves */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Moves</h2>
                    <ul className="list-disc list-inside grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                        {pokemon.moves.slice(0, 8).map((m) => (
                            <li key={m.move.name} className="capitalize">{m.move.name}</li>
                        ))}
                    </ul>
                </div>

                {/* Evolution Chain */}
                {evolution.length > 1 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Evolution Chain</h2>
                        <div className="flex flex-wrap gap-6 items-center justify-center">
                            {evolution.map((evoName) => (
                                <Link to={`/pokemon/${evoName}`} key={evoName} className="text-center">
                                    <img
                                        src={`https://img.pokemondb.net/artwork/large/${evoName}.jpg`}
                                        alt={evoName}
                                        className={`w-24 h-24 object-contain mx-auto rounded-lg transition border-4 ${
                                            evoName === name ? 'border-yellow-400 shadow-lg scale-105' : 'border-transparent'
                                        }`}
                                    />
                                    <span className="capitalize mt-2 block">{evoName}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Alternate Forms */}
                {varieties.length > 1 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Alternate Forms</h2>
                        <div className="flex flex-wrap gap-6 items-center justify-center">
                            {varieties.map((form) => (
                                <Link to={`/pokemon/${form.name}`} key={form.name} className="text-center">
                                    <img
                                        src={form.image}
                                        alt={form.name}
                                        className={`w-24 h-24 object-contain mx-auto rounded-lg transition border-2 ${
                                            form.name === name
                                                ? 'border-yellow-400 shadow scale-105'
                                                : 'border-transparent'
                                        }`}
                                    />
                                    <span className="capitalize mt-2 block">{form.name.replace(/-/g, ' ')}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Prev/Next Navigation */}
                <div className="mt-6 flex justify-between">
                    {prevEvo ? (
                        <button
                            onClick={() => navigate(`/pokemon/${prevEvo}`)}
                            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                        >
                            ← {prevEvo}
                        </button>
                    ) : <div />}
                    {nextEvo ? (
                        <button
                            onClick={() => navigate(`/pokemon/${nextEvo}`)}
                            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                        >
                            {nextEvo} →
                        </button>
                    ) : <div />}
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails
