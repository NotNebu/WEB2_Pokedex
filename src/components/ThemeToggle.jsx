import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button onClick={toggleDarkMode} className="p-2 text-white">
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
