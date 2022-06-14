import React from "react";
import PropTypes from "prop-types";

/**
 * The **SectionImg** component renders the image of a section in the webpage.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */

function SectionImg({ src, alt, className }) {
  return <img src={src} alt={alt} className={`max-w-full ${className}`} />;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

SectionImg.displayName = "SectionImg";
SectionImg.propTypes = propTypes;

export default SectionImg;
