import { FaMars, FaVenus, FaGenderless } from 'react-icons/fa';

const PokemonExtras = ({ extraInfo }) => {
    const genderSplit = extraInfo.gender?.split('/') || [];

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Additional Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {/* Gender */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Gender:</strong>{' '}
                    {extraInfo.gender === 'Genderless' ? (
                        <span className="inline-flex items-center gap-1">
              <FaGenderless className="w-4 h-4 text-gray-500" /> Genderless
            </span>
                    ) : (
                        <>
              <span className="inline-flex items-center gap-1 text-blue-500">
                <FaMars className="w-4 h-4" /> {genderSplit[0]?.trim()}
              </span>
                            {' / '}
                            <span className="inline-flex items-center gap-1 text-pink-500">
                <FaVenus className="w-4 h-4" /> {genderSplit[1]?.trim()}
              </span>
                        </>
                    )}
                </div>

                {/* Habitat */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Habitat:</strong> {extraInfo.habitat || 'Unknown'}
                </div>

                {/* Shape */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Shape:</strong> {extraInfo.shape || 'Unknown'}
                </div>

                {/* Growth Rate */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Growth Rate:</strong> {extraInfo.growth || 'Unknown'}
                </div>

                {/* Capture Rate */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Capture Rate:</strong> {extraInfo.captureRate ?? 'Unknown'}
                </div>

                {/* Base Happiness */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Base Happiness:</strong> {extraInfo.baseHappiness ?? 'Unknown'}
                </div>

                {/* Legendary */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Legendary:</strong> {extraInfo.isLegendary ? 'Yes' : 'No'}
                </div>

                {/* Mythical */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow-sm">
                    <strong>Mythical:</strong> {extraInfo.isMythical ? 'Yes' : 'No'}
                </div>
            </div>
        </div>
    );
};

export default PokemonExtras;
