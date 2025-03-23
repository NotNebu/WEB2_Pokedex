/**
 * Pagination Component
 * --------------------
 * Viser næste/forrige knapper baseret på tilgængelige URL'er.
 * Bruges i Pokédex til at navigere mellem sider med Pokémon.
 *
 * Props:
 * - onPrevious: funktion til at hente forrige side
 * - onNext: funktion til at hente næste side
 * - prevUrl: boolean (eller truthy værdi) som indikerer om der er en forrige side
 * - nextUrl: boolean (eller truthy værdi) som indikerer om der er en næste side
 */

const Pagination = ({ onPrevious, onNext, prevUrl, nextUrl }) => {
    return (
        <div className="flex justify-center mt-10 gap-4">
            {/* Forrige side */}
            {prevUrl && (
                <button
                    onClick={onPrevious}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium shadow transition"
                >
                    ← Forrige
                </button>
            )}

            {/* Næste side */}
            {nextUrl && (
                <button
                    onClick={onNext}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow transition"
                >
                    Næste →
                </button>
            )}
        </div>
    )
}

export default Pagination
