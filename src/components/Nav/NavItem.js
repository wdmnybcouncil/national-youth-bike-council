import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * The **NavItem** component renders each item in the Nav component.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function NavItem({ linkTo, children }) {
  return (
    <Link
      to={linkTo}
      className="mt-2 rounded-lg bg-transparent px-4 py-2 text-sm tracking-wide hover:bg-skin-fill-base hover:text-skin-primary focus:bg-skin-fill-accent focus:text-skin-muted focus:outline-none lg:mt-0 lg:ml-4 lg:text-base"
    >
      {children}
    </Link>
  );
}

const propTypes = {
  /**
   * Sets the url where the NavItem should point to when clicked
   */
  linkTo: PropTypes.string.isRequired,
  /**
   * Sets the content or text of the NavItem
   */
  children: PropTypes.any.isRequired,
};

NavItem.displayName = "NavItem";
NavItem.propTypes = propTypes;

export default NavItem;
