import PokemonCard from '@/components/pokemon/PokemonCard';
import SkeletonCard from '@/components/common/SkeletonCard';

const PokemonGrid = ({
                       loading,
                       itemsPerPage,
                       pokemonList,
                       setSelectedPokemon,
                       favorites,
                       setFavorites,
                       compareList,
                       toggleCompare,
                     }) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => <SkeletonCard key={index} />)
            : pokemonList.map((pokemon) => (
                <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={setSelectedPokemon}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                />
            ))}
      </div>
  );
};

export default PokemonGrid;
