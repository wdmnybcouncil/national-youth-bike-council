import PropTypes from 'prop-types';
import { usePagination, DOTS } from '../hooks/usePagination';

/**
 * The **Pagination** component implements pagination in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Pagination(props) {
  const { totalCount, currentPage, pageSize, onPageChange, siblingCount, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // No need to use pagination as the pageSize = no of records in the data
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={`mt-6 flex w-full list-none justify-center ${className}`}>
      <li
        key="previous"
        className={`my-auto mx-1 box-border flex h-[24px] w-[24px] items-center justify-center rounded-full bg-skin-fill-card-accent text-center text-sm leading-5 text-skin-accent transition hover:cursor-pointer hover:bg-skin-fill-accent hover:text-skin-muted focus:cursor-pointer focus:bg-skin-fill-accent focus:text-skin-muted sm:h-12 sm:w-12 sm:text-lg sm:font-semibold ${
          currentPage === 1 && `pointer-events-none bg-gray-100 text-gray-400`
        }`}
        onClick={onPrevious}
      >
        &#60;
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={`dots-${index}`}
              className="my-auto mx-1 box-border flex h-[24px] w-[24px] items-center justify-center rounded-full px-1 text-center text-2xl leading-5 text-skin-primary hover:cursor-default hover:bg-transparent sm:h-10 sm:w-10 sm:px-3"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`my-auto mx-1 box-border flex h-[24px] w-[24px] items-center justify-center rounded-full px-1 text-center text-sm font-semibold leading-5 hover:cursor-pointer hover:bg-skin-fill-card-accent hover:text-skin-accent focus:cursor-pointer focus:bg-skin-fill-card-accent focus:text-skin-accent sm:h-10 sm:w-10 sm:px-3 ${
              pageNumber === currentPage ? `bg-skin-fill-accent text-skin-muted` : `text-skin-primary`
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        key="next"
        className={`my-auto mx-1 box-border flex h-[24px] w-[24px] items-center justify-center rounded-full bg-skin-fill-card-accent text-center text-sm leading-5 text-skin-accent transition hover:cursor-pointer hover:bg-skin-fill-accent hover:text-skin-muted focus:cursor-pointer focus:bg-skin-fill-accent focus:text-skin-muted sm:h-12 sm:w-12 sm:text-lg sm:font-semibold ${
          currentPage === lastPage && `pointer-events-none bg-gray-100 text-gray-400`
        }`}
        onClick={onNext}
      >
        &#62;
      </li>
    </ul>
  );
}

const propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
  className: PropTypes.any,
};

Pagination.displayName = 'Pagination';
Pagination.propTypes = propTypes;

export default Pagination;
