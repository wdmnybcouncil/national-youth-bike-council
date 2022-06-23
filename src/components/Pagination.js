import React from "react";
import PropTypes from "prop-types";
import { usePagination, DOTS } from "../hooks/usePagination";

/**
 * The **Pagination** component implements pagination in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Pagination(props) {
  const {
    totalCount,
    currentPage,
    pageSize,
    onPageChange,
    siblingCount,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
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
    <ul className={`mt-6 flex justify-center w-full list-none ${className}`}>
      <li key="previous" className={`box-border my-auto mx-1 h-[24px] w-[24px] flex items-center justify-center text-center text-skin-accent text-sm leading-5 rounded-full border border-skin-accent transition hover:bg-skin-fill-accent hover:text-skin-muted hover:cursor-pointer focus:bg-skin-fill-accent focus:text-skin-muted focus:cursor-pointer sm:h-12 sm:w-12 sm:font-semibold sm:text-lg ${currentPage === 1 && `pointer-events-none border-gray-300 text-gray-300`}`} onClick={onPrevious}>
        &#60;
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`dots-${index}`} className="box-border my-auto mx-1 px-1 h-[24px] w-[24px] text-center flex items-center justify-center text-skin-primary rounded-full leading-5 text-2xl hover:bg-transparent hover:cursor-default sm:h-10 sm:w-10 sm:px-3">
              &#8230;
            </li>);
        }

        return (
          <li key={pageNumber} className={`box-border my-auto mx-1 px-1 h-[24px] w-[24px] text-center flex items-center justify-center text-sm font-semibold rounded-full leading-5 hover:bg-skin-fill-card-accent hover:text-skin-primary hover:cursor-pointer focus:bg-skin-fill-card-accent focus:text-skin-primary focus:cursor-pointer sm:h-10 sm:w-10 sm:px-3 ${pageNumber === currentPage ? `bg-skin-fill-accent text-skin-muted` : `text-skin-primary`}`} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}

      <li key="next" className={`box-border my-auto mx-1 h-[24px] w-[24px] flex items-center justify-center text-center text-skin-accent text-sm leading-5 rounded-full border border-skin-accent transition hover:bg-skin-fill-accent hover:text-skin-muted hover:cursor-pointer focus:bg-skin-fill-accent focus:text-skin-muted focus:cursor-pointer sm:h-12 sm:w-12 sm:font-semibold sm:text-lg ${currentPage === lastPage && `pointer-events-none border-gray-300 text-gray-300`}`} onClick={onNext}>
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
}

Pagination.displayName = "Pagination";
Pagination.propTypes = propTypes;

export default Pagination;
