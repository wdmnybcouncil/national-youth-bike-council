import React from "react";
import PropTypes from "prop-types";

/**
 * The **SectionHeading** component renders the heading of a section in the webpage.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function SectionHeading({ children }) {
  return (
    <h2 className="relative mb-4 w-full border-b border-skin-accent pb-1 font-balgin text-2xl text-skin-primary before:absolute before:-bottom-1 before:block before:h-2 before:w-2 before:rounded-full before:bg-skin-fill-accent md:mb-8 md:pb-2 md:text-4xl md:before:-bottom-1.5 md:before:h-3 md:before:w-3">
      {children}
    </h2>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

SectionHeading.displayName = "SectionHeading";
SectionHeading.propTypes = propTypes;

export default SectionHeading;
