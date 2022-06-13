import React from "react";
import PropTypes from "prop-types";

/**
 * The **MailTo** component renders a link formatted to send an email (mailto: link).
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function MailTo({ email, subject = "", body = "", children }) {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return (
    <a href={`mailto:${email}${params}`} className="inline-block decoration-skin-accent underline-offset-2 transition-all hover:underline">
      {children}
    </a>
  );
}

const propTypes = {
  /**
   * Sets the email of the receiver
   */
  email: PropTypes.string.isRequired,
  /**
   * Sets the subject of the email
   */
  subject: PropTypes.string,
  /**
   * Sets the body of the email
   */
  body: PropTypes.string,
};

MailTo.displayName = "MailTo";
MailTo.propTypes = propTypes;

export default MailTo;
