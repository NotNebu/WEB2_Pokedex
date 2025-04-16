import PageInfo from '@/components/common/PageInfo';
import Pagination from '@/components/common/Pagination';

const PaginationControls = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPrevious,
  onNext,
  hasPrev,
  hasNext,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <PageInfo currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} />

      <Pagination onPrevious={onPrevious} onNext={onNext} prevUrl={hasPrev} nextUrl={hasNext} />
    </div>
  );
};

export default PaginationControls;
