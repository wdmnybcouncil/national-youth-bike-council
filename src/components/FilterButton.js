import React from "react";
import PropTypes from "prop-types";

/**
 * The **FilterButton** component renders the button responsible for filtering posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function FilterButton({ filterCategory, selectedFilterCategory, handleFilterPosts }) {
  return (
    <button type="button" className={`w-full max-w-[80px] py-2 px-1 text-sm text-center rounded-full font-semibold transition hover:text-skin-muted hover:bg-skin-fill-accent focus:text-skin-muted focus:bg-skin-fill-accent ${(selectedFilterCategory === filterCategory) ? `bg-skin-fill-accent text-skin-muted` : `bg-skin-fill-card-accent text-skin-accent`}`} onClick={() => handleFilterPosts(filterCategory)}>
      {filterCategory}
    </button >
  );
}

const propTypes = {
  filterCategory: PropTypes.string.isRequired,
  selectedFilterCategory: PropTypes.string.isRequired,
  handleFilterPosts: PropTypes.func.isRequired,
}

FilterButton.displayName = "FilterButton";
FilterButton.protoTypes = propTypes;

export default FilterButton;
