import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

/**
 * The **SectionText** component renders the text of a section in the webpage.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function SectionText({ children }) {
  return <ReactMarkdown className="markdown">{children}</ReactMarkdown>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

SectionText.displayName = "SectionText";
SectionText.propTypes = propTypes;

export default SectionText;
