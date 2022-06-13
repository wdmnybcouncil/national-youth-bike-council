import React from "react";
import PropTypes from "prop-types";

/**
 * The **FooterHeader** component renders a heading in the footer
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function FooterHeader({ children }) {
  return (
    <h2 className="font-semibold uppercase">{children}</h2>
  );
}

const propTypes = {
  /**
   * Sets the content of the FooterHeader
   */
  children: PropTypes.any.isRequired,
};

FooterHeader.displayName = "FooterHeader";
FooterHeader.propTypes = propTypes;

export default FooterHeader;