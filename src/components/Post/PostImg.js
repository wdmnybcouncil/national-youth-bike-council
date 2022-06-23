import React from "react";
import PropTypes from "prop-types";

/**
 * The **PostImg** component renders the image of a post in the webpage.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */

function PostImg({ src, alt, className }) {
  return <img src={src} alt={alt} className={`max-h-80 max-w-full rounded-md border-4 border-skin-accent ${className}`} />;
}

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

PostImg.displayName = "PostImg";
PostImg.propTypes = propTypes;

export default PostImg;
