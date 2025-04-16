const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl p-4 border flex flex-col items-center space-y-2">
      <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full" />
      <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="w-24 h-5 bg-gray-300 dark:bg-gray-600 rounded" />
    </div>
  );
};

export default SkeletonCard;
