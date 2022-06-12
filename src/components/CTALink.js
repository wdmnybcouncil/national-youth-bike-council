import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * The **CTALink** component renders any call to action link on the page.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */

function CTALink(props) {
  const { linkTo, children } = props;

  return (
    <Link
      to={linkTo}
      className="focus:ring-offset-0.5 ml-2 mt-2 inline-block max-w-fit transform rounded-full bg-skin-button-accent px-6 py-2 text-lg uppercase tracking-wide text-skin-muted drop-shadow-md transition hover:-translate-y-0.5 hover:bg-skin-button-accent-hover focus:outline-none focus:ring-1 focus:ring-white lg:mt-0 lg:ml-4"
    >
      {children}
    </Link>
  );
}

const propTypes = {
  /**
   * Sets the url where the CTALink should point to when clicked
   */
  linkTo: PropTypes.string.isRequired,
  /**
   * Sets the content of the CTALink
   */
  children: PropTypes.any.isRequired,
};

CTALink.displayName = "CTALink";
CTALink.propTypes = propTypes;

export default CTALink;
