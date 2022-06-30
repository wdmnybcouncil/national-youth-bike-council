import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * The **DropdownItem** component renders each item in the Dropdown.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function DropdownItem({ type, linkTo, children }) {
  if (type === "internal") {
    return (
      <Link
        to={linkTo}
        className="mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm tracking-wide hover:bg-gray-200 hover:text-skin-primary focus:bg-gray-200 focus:text-skin-primary focus:outline-none lg:mt-0 lg:text-base"
      >
        {children}
      </Link>
    );
  }
  if (type === "external") {
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noreferrer"
        className="mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm tracking-wide hover:bg-gray-200 hover:text-skin-primary focus:bg-gray-200 focus:text-skin-primary focus:outline-none lg:mt-0 lg:text-base"
      >
        {children}
      </a>
    );
  }
}

const propTypes = {
  /**
   * Defines the type of the link: whether it is linking to an external page or internal page
   */
  type: PropTypes.oneOf(["external", "internal"]).isRequired,
  /**
   * Sets the url where the DropdownItem should point to when clicked
   */
  linkTo: PropTypes.string.isRequired,
  /**
   * Sets the content or text of the DropdownItem
   */
  children: PropTypes.any.isRequired,
};

DropdownItem.displayName = "DropdownItem";
DropdownItem.propTypes = propTypes;

export default DropdownItem;
