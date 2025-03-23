import { useEffect, useState } from 'react'
import pokeballGif from '../assets/pokeball.gif'

const SplashScreen = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        const fadeDelay = setTimeout(() => setFadeOut(true), 5500)
        const doneDelay = setTimeout(() => onComplete(), 4000)

        return () => {
            clearTimeout(fadeDelay)
            clearTimeout(doneDelay)
        }
    }, [])

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <img src={pokeballGif} alt="Pokéball Opening" className="w-[32rem] h-[32rem] object-contain" />

            <div className="mt-6 text-white text-xl font-bold animate-fade-in text-center">
                Welcome to the Pokédex
            </div>
        </div>
    )
}

export default SplashScreen
