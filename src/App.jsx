import { Routes, Route, Navigate } from 'react-router-dom';
import About from '@/pages/About';
import Pokedex from '@/pages/Pokedex';
import Navbar from '@/components/layout/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/pokedex" />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Pokedex />} />
      </Routes>
    </div>
  );
}

export default App;
