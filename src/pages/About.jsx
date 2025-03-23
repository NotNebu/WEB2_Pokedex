const About = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 text-center text-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-4">Om Projektet</h1>

            <p className="mb-4">
                Dette Pokédex-projekt er udviklet med <strong>React</strong>, <strong>Vite</strong> og <strong>Tailwind CSS</strong>, og bruger data fra den offentligt tilgængelige
                <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className="text-blue-400 underline ml-1">PokéAPI</a>.
            </p>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Projektet indeholder funktioner som søgning, typefiltrering, paginering, og detaljerede sider for hver Pokémon med information om stats, evner, højdevægt, udviklingskæde og meget mere.
                Man kan også se shiny-versioner og alternative former, fx Mega Evolutions eller G-Max former.
            </p>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
                En sammenligningsfunktion gør det muligt at se stats side om side mellem to Pokémoner, og detaljer vises med type-farvede baggrunde og animerede stat-bars.
            </p>
        </div>
    )
}

export default About
