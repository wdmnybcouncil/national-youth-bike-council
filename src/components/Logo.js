import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * The **Logo** component renders the logo of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Logo({ linkTo, logoSrc, logoAlt }) {
  return (
    <Link to={linkTo} className="focus:shadow-outline focus:outline-none">
      <img src={logoSrc} alt={logoAlt} className="w-16" />
    </Link>
  );
}

const propTypes = {
  /**
   * Sets the url where the Logo should point to when clicked
   */
  linkTo: PropTypes.string.isRequired,
  /**
   * Sets the url of the Logo icon
   */
  logoSrc: PropTypes.string.isRequired,
  /**
   * Sets the alt text for the Logo icon
   */
  logoAlt: PropTypes.string.isRequired,
};

Logo.displayName = "Logo";
Logo.protoTypes = propTypes;

export default Logo;
