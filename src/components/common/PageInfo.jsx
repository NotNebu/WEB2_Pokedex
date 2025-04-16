const PageInfo = ({ currentPage, totalItems, itemsPerPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Page {currentPage} of {totalPages}
    </p>
  );
};

export default PageInfo;
