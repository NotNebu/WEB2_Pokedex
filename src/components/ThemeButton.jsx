import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

const ThemeButton = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeButton;
