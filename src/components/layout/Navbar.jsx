import { Link } from 'react-router-dom';
import ThemeButton from '@/components/layout/ThemeButton';

const Navbar = () => {
  return (
    <header className="w-full p-4 bg-white dark:bg-gray-900 shadow mb-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            <Link to="/pokedex">Pokédex</Link>
          </h1>
          <nav className="hidden sm:flex gap-4 text-gray-700 dark:text-gray-300 text-base">
            <Link to="/pokedex" className="hover:underline">
              Pokédex
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </nav>
        </div>
        <ThemeButton />
      </div>
    </header>
  );
};

export default Navbar;
