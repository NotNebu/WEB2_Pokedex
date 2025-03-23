import { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonCard from '../components/PokemonCard'
import Pagination from '../components/Pagination'
import SkeletonCard from '../components/SkeletonCard'

const ITEMS_PER_PAGE = 12

const Pokedex = () => {
    const [allPokemon, setAllPokemon] = useState([])
    const [displayedPokemon, setDisplayedPokemon] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

    // Fetch all basic Pokémon list
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
                setAllPokemon(res.data.results)
            } catch (err) {
                console.error(err)
            }
        }
        fetchAll()
    }, [])

    // Recalculate list on filters or page
    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true)

            // Apply search filter
            let filtered = allPokemon.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )

            // Filter by type
            if (typeFilter !== 'all') {
                try {
                    const typeRes = await axios.get(`https://pokeapi.co/api/v2/type/${typeFilter}`)
                    const typeNames = typeRes.data.pokemon.map(p => p.pokemon.name)
                    filtered = filtered.filter(p => typeNames.includes(p.name))
                } catch (err) {
                    console.error('Failed to fetch type filter:', err)
                }
            }

            // Slice for pagination
            const start = (currentPage - 1) * ITEMS_PER_PAGE
            const pageSlice = filtered.slice(start, start + ITEMS_PER_PAGE)

            // Fetch detailed data
            try {
                const detailed = await Promise.all(pageSlice.map(p => axios.get(p.url)))
                setDisplayedPokemon(detailed.map(res => res.data))
            } catch (err) {
                console.error('Failed to fetch Pokémon details:', err)
            } finally {
                setLoading(false)
            }
        }

        if (allPokemon.length > 0) {
            fetchDetails()
        }
    }, [searchTerm, typeFilter, currentPage, allPokemon])

    // Reset page when filters/search change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, typeFilter])

    const totalFiltered = allPokemon.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Pokédex</h1>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    className="w-full md:w-80 px-4 py-2 rounded shadow border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 rounded shadow border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                    <option value="all">All Types</option>
                    <option value="normal">Normal</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="ice">Ice</option>
                    <option value="fighting">Fighting</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="flying">Flying</option>
                    <option value="psychic">Psychic</option>
                    <option value="bug">Bug</option>
                    <option value="rock">Rock</option>
                    <option value="ghost">Ghost</option>
                    <option value="dark">Dark</option>
                    <option value="dragon">Dragon</option>
                    <option value="steel">Steel</option>
                    <option value="fairy">Fairy</option>
                </select>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedPokemon.map((pokemon) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <Pagination
                            onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            onNext={() => setCurrentPage((p) => p + 1)}
                            prevUrl={currentPage > 1}
                            nextUrl={totalFiltered.length > currentPage * ITEMS_PER_PAGE}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Pokedex
