import { useState, useEffect } from 'react';
import FilterBar from '@/components/common/FilterBar';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import PaginationControls from '@/components/common/PaginationControls';
import PokemonModal from '@/components/pokemon/PokemonModal';
import CompareModal from '@/components/modal/CompareModal';
import usePokemonData from '@/hooks/usePokemonData.jsx';

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, itemsPerPage, showOnlyFavorites]);

  const toggleCompare = (pokemon) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === pokemon.id);
      if (exists) return prev.filter((p) => p.id !== pokemon.id);
      if (prev.length < 2) return [...prev, pokemon];
      return prev;
    });
  };

  const { displayedPokemon, loading, totalFiltered } = usePokemonData({
    searchTerm,
    typeFilter,
    currentPage,
    itemsPerPage,
    favorites,
    showOnlyFavorites,
  });

  return (
      <>
        <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Pokédex</h1>

          <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showOnlyFavorites={showOnlyFavorites}
              setShowOnlyFavorites={setShowOnlyFavorites}
          />

          <PokemonGrid
              loading={loading}
              itemsPerPage={itemsPerPage}
              pokemonList={displayedPokemon}
              setSelectedPokemon={setSelectedPokemon}
              favorites={favorites}
              setFavorites={setFavorites}
              compareList={compareList}
              toggleCompare={toggleCompare}
          />

          <PaginationControls
              currentPage={currentPage}
              totalItems={totalFiltered.length}
              itemsPerPage={itemsPerPage}
              onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              onNext={() => setCurrentPage((p) => p + 1)}
              hasPrev={currentPage > 1}
              hasNext={totalFiltered.length > currentPage * itemsPerPage}
          />

          {selectedPokemon && (
              <PokemonModal
                  pokemon={selectedPokemon}
                  onClose={() => setSelectedPokemon(null)}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  compareList={compareList}
                  setCompareList={setCompareList}
                  setShowCompareModal={setShowCompareModal}
              />
          )}

          {showCompareModal && compareList.length === 2 && (
              <CompareModal
                  pokemonA={compareList[0]}
                  pokemonB={compareList[1]}
                  onClose={() => setShowCompareModal(false)}
                  setCompareList={setCompareList}
              />
          )}
        </div>

        {/* Global Compare Button */}
        {compareList.length === 2 && (
            <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
              <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-6 py-2 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700"
              >
                Compare Selected Pokémon
              </button>
            </div>
        )}
      </>
  );
};

export default Pokedex;
