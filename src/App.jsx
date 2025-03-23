import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Pokedex from './pages/Pokedex'
import About from './pages/About'
import PokemonDetails from './components/PokemonDetails'
import ThemeButton from './components/ThemeButton'
import SplashScreen from './components/SplashScreen'

function App() {
    const [showSplash, setShowSplash] = useState(true)

    return (
        <>
            {showSplash ? (
                <SplashScreen onComplete={() => setShowSplash(false)} />
            ) : (
                <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow mb-4">
                        <div className="max-w-6xl mx-auto flex justify-between items-center">
                            <div className="flex gap-6">
                                <Link to="/pokedex" className="hover:underline">Pokédex</Link>
                                <Link to="/about" className="hover:underline">About</Link>
                            </div>
                            <ThemeButton />
                        </div>
                    </nav>

                    <Routes>
                        <Route path="/pokedex" element={<Pokedex />} />
                        <Route path="/pokemon/:name" element={<PokemonDetails />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<Pokedex />} />
                    </Routes>
                </div>
            )}
        </>
    )
}

export default App
