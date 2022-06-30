import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * The **PageLink** component renders links in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function PageLink({ type, linkTo, className = "", children }) {
  if (type === "internal") {
    return (
      <Link to={linkTo} className={`gap-2 mt-4 flex underline underline-offset-4 transition-all hover:decoration-skin-accent hover:opacity-90 ${className}`}>
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
        className={`gap-2 mt-4 flex underline underline-offset-4 transition-all hover:decoration-skin-accent hover:opacity-90 ${className}`}
      >
        {children}
      </a>
    );
  }

  return null;
}

const propTypes = {
  /**
   * Defines the type of the link: whether it is linking to an external page or internal page
   */
  type: PropTypes.oneOf(["external", "internal"]).isRequired,
  /**
   * Sets the url where the PageLink should point to when clicked
   */
  linkTo: PropTypes.string.isRequired,
  className: PropTypes.string,
  /**
   * Sets the content or text of the PageLink
   */
  children: PropTypes.any.isRequired,
};

PageLink.displayName = "PageLink";
PageLink.propTypes = propTypes;

export default PageLink;
