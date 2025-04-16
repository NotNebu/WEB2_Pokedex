const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">About the Project</h1>

      <p className="mb-4">
        This Pokédex project is built with <strong>Vite</strong>, <strong>React</strong>, and{' '}
        <strong>Tailwind CSS</strong>, and uses data from the publicly available
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline ml-1"
        >
          PokéAPI
        </a>
        .
      </p>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        The project includes features like search, type filtering, pagination, and detailed pages
        for each Pokémon with information about stats, abilities, height and weight, evolution
        chains, and much more. You can also view shiny versions and alternative forms, such as Mega
        Evolutions or G-Max forms.
      </p>
    </div>
  );
};

export default About;
