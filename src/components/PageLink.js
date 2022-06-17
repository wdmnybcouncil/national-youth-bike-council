import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * The **FooterLink** component renders links in the footer
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function FooterLink({ linkTo, children }) {
  return (
    <Link to={linkTo} className="flex gap-2 decoration-skin-accent underline-offset-4 transition-all hover:underline hover:opacity-90">
      {children}
    </Link>
  );
}

const propTypes = {
  /**
   * Sets the url where the FooterLink should point to when clicked
   */
  linkTo: PropTypes.string.isRequired,
  /**
   * Sets the content or text of the FooterLink
   */
  children: PropTypes.any.isRequired,
};

FooterLink.displayName = "FooterLink";
FooterLink.propTypes = propTypes;

export default FooterLink;
