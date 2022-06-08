import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * The **CTALink** component renders any call to action link on the page.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */

function CTALink(props) {
  const {
    to,
    className,
    children,
  } = props;

  return (
    <Link to={to} className={`inline-block py-4 px-8 rounded-full drop-shadow-md transition ${className}`}>
      {children}
    </Link >
  );
}

CTALink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export { CTALink };
