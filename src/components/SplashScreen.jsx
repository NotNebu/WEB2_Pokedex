import { useEffect, useState } from 'react';
import pokeballGif from '../assets/pokeball.gif';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeDelay = setTimeout(() => setFadeOut(true), 1500);
    const doneDelay = setTimeout(() => onComplete(), 1500);

    return () => {
      clearTimeout(fadeDelay);
      clearTimeout(doneDelay);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <img
        src={pokeballGif}
        alt="Pokéball Opening"
        className="w-[80vw] max-w-[500px] h-auto object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.25)]"
      />

      <div className="mt-6 text-white text-xl font-bold animate-fade-in-black text-center">
        Welcome to the Pokédex
      </div>
    </div>
  );
};

export default SplashScreen;
