import React from "react";
import PropTypes from "prop-types";
import DropdownItem from "./DropdownItem";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

/**
 * The **Dropdown** component renders each dropdown in the navigation menu.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Dropdown({ label, children }) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const handleDropdownClick = () => setIsDropdownOpen(!isDropdownOpen);

  const ref = React.useRef();
  useOnClickOutside(
    ref,
    React.useCallback(() => setIsDropdownOpen(false), [])
  );

  return (
    <div ref={ref} className="relative" onClick={handleDropdownClick}>
      <button
        className="focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-transparent px-4 py-2 text-left tracking-wide hover:bg-skin-fill-base hover:text-skin-primary focus:bg-skin-fill-accent focus:text-skin-muted focus:outline-none lg:mt-0 lg:ml-4 lg:inline lg:w-auto lg:text-lg"
        onClick={handleDropdownClick}
      >
        <span>{label}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 10 8"
          className={`${isDropdownOpen ? `rotate-180` : `rotate-0`} mt-1 ml-2 inline h-3 w-3 transform transition-transform duration-200 lg:-mt-1`}
        >
          <path fillRule="evenodd" d="M5 8L9.33013 0.5H0.669873L5 8Z" clipRule="evenodd" />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md shadow-lg lg:w-48">
          <div className="rounded-md bg-skin-fill-base px-2 py-2 text-skin-base shadow">{children}</div>
        </div>
      )}
    </div>
  );
}

const propTypes = {
  /**
   * Sets the label of the dropdown
   */
  label: PropTypes.string.isRequired,
  /**
   * Sets the content of the Dropdown
   */
  children: PropTypes.any.isRequired,
};

Dropdown.displayName = "Dropdown";
Dropdown.propTypes = propTypes;

export default Object.assign(Dropdown, {
  Item: DropdownItem,
});
