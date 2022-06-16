import React from "react";
import PropTypes from "prop-types";

/**
 * The **ProfileCardImg** component renders the profile image for user profile card in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProfileCardImg({ src, alt, className = "" }) {
  return <img src={src} alt={alt} className={`-mt-28 mb-2 w-40 h-40 max-w-full rounded-full border-4 border-skin-accent group-hover:scale-105 transition-all ${className}`} />;
}

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ProfileCardImg.displayName = "ProfileCardImg";
ProfileCardImg.propTypes = propTypes;

export default ProfileCardImg;
