const FilterBar = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  itemsPerPage,
  setItemsPerPage,
  showOnlyFavorites,
  setShowOnlyFavorites,
}) => {
  const types = [
    'normal',
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dark',
    'dragon',
    'steel',
    'fairy',
  ];

  return (
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
        {types.map((type) => (
          <option key={type} value={type}>
            {type[0].toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2 w-full md:w-auto">
        <label htmlFor="itemsPerPage" className="text-sm font-medium">
          Show:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value === 9999) {
              const confirmShowAll = window.confirm(
                '⚠️ Showing all Pokémon may slow down the browser. Are you sure?'
              );
              if (!confirmShowAll) return;
            }
            setItemsPerPage(value);
          }}
          className="w-full md:w-48 px-4 py-2 rounded shadow border bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
        >
          {[12, 24, 50, 100, 9999].map((n) => (
            <option key={n} value={n}>
              {n === 9999 ? 'Show All' : `${n} per page`}
            </option>
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
  );
};

export default FilterBar;
