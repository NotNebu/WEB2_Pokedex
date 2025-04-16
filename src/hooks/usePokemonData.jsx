import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonData = ({
  searchTerm,
  typeFilter,
  currentPage,
  itemsPerPage,
  favorites,
  showOnlyFavorites,
}) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hent alle Pokémon-navne + URLs én gang
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        setAllPokemon(res.data.results);
      } catch (err) {
        console.error('Error fetching all Pokémon:', err);
      }
    };

    fetchAll();
  }, []);

  // Filtrer og hent detaljer for den nuværende side
  useEffect(() => {
    const fetchDetails = async () => {
      if (!allPokemon.length) return;
      setLoading(true);

      try {
        let filtered = allPokemon.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (showOnlyFavorites) {
          filtered = filtered.filter((p) => favorites.includes(p.name));
        }

        if (typeFilter !== 'all') {
          const typeRes = await axios.get(`https://pokeapi.co/api/v2/type/${typeFilter}`);
          const typeNames = typeRes.data.pokemon.map((p) => p.pokemon.name);
          filtered = filtered.filter((p) => typeNames.includes(p.name));
        }

        const start = (currentPage - 1) * itemsPerPage;
        const pageSlice = filtered.slice(start, start + itemsPerPage);
        const detailed = await Promise.all(pageSlice.map((p) => axios.get(p.url)));

        setDisplayedPokemon(detailed.map((res) => res.data));
      } catch (err) {
        console.error('Error fetching Pokémon details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [searchTerm, typeFilter, currentPage, itemsPerPage, allPokemon, favorites, showOnlyFavorites]);

  const totalFiltered = allPokemon
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => !showOnlyFavorites || favorites.includes(p.name));

  return {
    displayedPokemon,
    loading,
    totalFiltered,
  };
};

export default usePokemonData;
