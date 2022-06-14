import React from "react";
import PropTypes from "prop-types";

/**
 * The **ProfileCardText** component renders the text for user profile card in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProfileCardText({ children }) {
  return (
    <p
      className={`relative my-6 mx-4 text-sm before:absolute before:top-0 before:-left-5 before:h-4 before:w-4 before:bg-[url('./images/icon-quotes.svg')] before:bg-contain before:bg-no-repeat`}
    >
      {children}
    </p>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

ProfileCardText.displayName = "ProfileCardText";
ProfileCardText.propTypes = propTypes;

export default ProfileCardText;
