import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import PokemonModal from '../components/PokemonModal';

const Pokedex = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        setAllPokemon(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      let filtered = allPokemon.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (showOnlyFavorites) {
        filtered = filtered.filter((p) => favorites.includes(p.name));
      }

      if (typeFilter !== 'all') {
        try {
          const typeRes = await axios.get(`https://pokeapi.co/api/v2/type/${typeFilter}`);
          const typeNames = typeRes.data.pokemon.map((p) => p.pokemon.name);
          filtered = filtered.filter((p) => typeNames.includes(p.name));
        } catch (err) {
          console.error('Failed to fetch type filter:', err);
        }
      }

      const start = (currentPage - 1) * itemsPerPage;
      const pageSlice = filtered.slice(start, start + itemsPerPage);

      try {
        const detailed = await Promise.all(pageSlice.map((p) => axios.get(p.url)));
        setDisplayedPokemon(detailed.map((res) => res.data));
      } catch (err) {
        console.error('Failed to fetch Pokémon details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (allPokemon.length > 0) {
      fetchDetails();
    }
  }, [searchTerm, typeFilter, currentPage, itemsPerPage, allPokemon, favorites, showOnlyFavorites]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, itemsPerPage, showOnlyFavorites]);

  const totalFiltered = allPokemon
      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((p) => !showOnlyFavorites || favorites.includes(p.name));

  return (
      <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Pokédex</h1>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-center justify-center mb-8">
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
            {[
              'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
              'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'
            ].map((type) => (
                <option key={type} value={type}>{type[0].toUpperCase() + type.slice(1)}</option>
            ))}
          </select>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <label htmlFor="itemsPerPage" className="text-sm font-medium">Show:</label>
            <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value === 9999) {
                    const confirmShowAll = window.confirm(
                        "⚠️ Showing all Pokémon may slow down the browser. Are you sure?"
                    );
                    if (!confirmShowAll) return;
                  }
                  setItemsPerPage(value);
                }}
                className="w-full md:w-48 px-4 py-2 rounded shadow border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              {[12, 24, 50, 100, 9999].map(n => (
                  <option key={n} value={n}>{n === 9999 ? 'Show All' : `${n} per page`}</option>
              ))}
            </select>
          </div>

          <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-4 py-2 rounded shadow font-semibold transition ${
                  showOnlyFavorites ? 'bg-yellow-400 text-black' : 'bg-gray-300 dark:bg-gray-700'
              }`}
          >
            {showOnlyFavorites ? 'Show All' : 'Only Favorites ⭐'}
          </button>
        </div>

        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonCard key={index} />
              ))}
            </div>
        ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedPokemon.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={setSelectedPokemon}
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />
                ))}
              </div>

              <div className="flex flex-col items-center gap-4 mt-10">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {Math.ceil(totalFiltered.length / itemsPerPage)}
                </p>

                <Pagination
                    onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    onNext={() => setCurrentPage((p) => p + 1)}
                    prevUrl={currentPage > 1}
                    nextUrl={totalFiltered.length > currentPage * itemsPerPage}
                />
              </div>
            </>
        )}

        <PokemonModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            favorites={favorites}
            setFavorites={setFavorites}
        />
      </div>
  );
};

export default Pokedex;
