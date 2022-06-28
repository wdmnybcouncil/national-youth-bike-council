import React from "react";
import PropTypes from "prop-types";

/**
 * The **FilterButton** component renders the button responsible for filtering posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function FilterButton({ filterCategory, selectedFilterCategory, handleFilter }) {
  return (
    <button type="button" className={`py-2 px-8 text-sm text-center rounded-full font-semibold transition hover:text-skin-muted hover:bg-skin-fill-accent focus:text-skin-muted focus:bg-skin-fill-accent ${(selectedFilterCategory === filterCategory) ? `bg-skin-fill-accent text-skin-muted` : `bg-skin-fill-card-accent text-skin-accent`}`} onClick={() => handleFilter(filterCategory)}>
      {filterCategory}
    </button >
  );
}

const propTypes = {
  filterCategory: PropTypes.string.isRequired,
  selectedFilterCategory: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
}

FilterButton.displayName = "FilterButton";
FilterButton.protoTypes = propTypes;

export default FilterButton;
