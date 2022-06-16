import React from "react";
import PropTypes from "prop-types";

/**
 * The **SectionHashtags** component renders the hashtags of a section in the webpage.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function SectionHashtags({ children }) {
  return <p className="rounded-md bg-gray-50 px-2 py-4 text-sm italic leading-6 tracking-wide text-skin-primary">{children}</p>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

SectionHashtags.displayName = "SectionHashtags";
SectionHashtags.propTypes = propTypes;

export default SectionHashtags;