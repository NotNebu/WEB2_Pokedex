import { useState, useEffect } from 'react';
import FilterBar from '@/components/common/FilterBar';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import PaginationControls from '@/components/common/PaginationControls';
import PokemonModal from '@/components/pokemon/PokemonModal';
import usePokemonData from '@/hooks/usePokemonData.jsx';

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1);
  }, [searchTerm, typeFilter, itemsPerPage, showOnlyFavorites]);

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

        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </div>
    </>
  );
};

export default Pokedex;
