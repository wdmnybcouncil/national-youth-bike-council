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

Logo.propTypes = {
  linkTo: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
  logoAlt: PropTypes.string.isRequired,
};

export { Logo };
