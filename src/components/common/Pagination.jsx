const Pagination = ({ onPrevious, onNext, prevUrl, nextUrl }) => {
  return (
    <div className="flex justify-center mt-10 gap-4">
      {/* Forrige side */}
      {prevUrl && (
        <button
          onClick={onPrevious}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium shadow transition"
        >
          ← Previous
        </button>
      )}

      {/* Næste side */}
      {nextUrl && (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium shadow transition"
        >
          Next →
        </button>
      )}
    </div>
  );
};

export default Pagination;
