import { useEffect, useState } from 'react';
import axios from 'axios';

import PokemonHeader from '@/components/modal/PokemonHeader';
import PokemonStats from '@/components/modal/PokemonStats';
import PokemonVarieties from '@/components/modal/PokemonVarieties';
import PokemonEvolution from '@/components/modal/PokemonEvolution';
import PokemonExtras from '@/components/modal/PokemonExtras';

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
  const [extraInfo, setExtraInfo] = useState({});

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
        setEvoIndex(evoArray.findIndex((name) => name === currentPokemon.name));

        const forms = await Promise.all(
            speciesRes.data.varieties.map(async (variant) => {
              const res = await axios.get(variant.pokemon.url);
              const sprite =
                  res.data.sprites.other['official-artwork'].front_default ||
                  res.data.sprites.front_default;
              return {
                name: variant.pokemon.name,
                image: sprite,
              };
            })
        );
        setVarieties(forms);

        const genderRate = speciesRes.data.gender_rate;
        const genderText =
            genderRate === -1
                ? 'Genderless'
                : `${((8 - genderRate) / 8) * 100}% Male / ${(genderRate / 8) * 100}% Female`;

        setExtraInfo({
          gender: genderText,
          habitat: speciesRes.data.habitat?.name || 'Unknown',
          shape: speciesRes.data.shape?.name || 'Unknown',
          growth: speciesRes.data.growth_rate?.name || 'Unknown',
          captureRate: speciesRes.data.capture_rate,
          baseHappiness: speciesRes.data.base_happiness,
          isLegendary: speciesRes.data.is_legendary,
          isMythical: speciesRes.data.is_mythical,
        });
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

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-2">
        <div className="relative bg-white text-gray-900 dark:bg-gray-900 dark:text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-xl">
          {/* ✕ Close button outside the content */}
          <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition"
              aria-label="Close Modal"
          >
            ✕
          </button>

          {loading ? (
              <p className="text-center">Loading Pokémon details...</p>
          ) : (
              <>
                <PokemonHeader
                    currentPokemon={currentPokemon}
                    showShiny={showShiny}
                    setShowShiny={setShowShiny}
                    flavorText={flavorText}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />

                <PokemonStats
                    currentPokemon={currentPokemon}
                    primaryType={primaryType}
                    typeColors={typeColors}
                />

                <PokemonExtras extraInfo={extraInfo} />

                {evolution.length > 1 && (
                    <PokemonEvolution
                        currentPokemon={currentPokemon}
                        evolution={evolution}
                        evoIndex={evoIndex}
                        setCurrentPokemon={setCurrentPokemon}
                    />
                )}

                {varieties.length > 1 && (
                    <PokemonVarieties
                        varieties={varieties}
                        currentPokemon={currentPokemon}
                        setCurrentPokemon={setCurrentPokemon}
                    />
                )}
              </>
          )}
        </div>
      </div>
  );
};

export default PokemonModal;
