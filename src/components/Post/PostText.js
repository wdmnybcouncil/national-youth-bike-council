import React from "react";
import PropTypes from "prop-types";

/**
 * The **PostText** component renders a text for post in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function PostText({ children }) {
  return <p className="my-4 flex-grow whitespace-pre-line text-sm">{children}</p>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

PostText.displayName = "PostText";
PostText.propTypes = propTypes;

export default PostText;
