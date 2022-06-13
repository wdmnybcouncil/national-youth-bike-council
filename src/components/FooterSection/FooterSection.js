import React from "react";
import PropTypes from "prop-types";
import FooterHeader from "./FooterHeader";
import FooterLink from "./FooterLink";

/**
 * The **FooterSection** component renders a section in the footer
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function FooterSection({ children }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

const propTypes = {
  /**
   * Sets the content of the FooterSection
   */
  children: PropTypes.any.isRequired,
};

FooterSection.displayName = "FooterSection";
FooterSection.propTypes = propTypes;

export default Object.assign(FooterSection, {
  Header: FooterHeader,
  Link: FooterLink,
});
