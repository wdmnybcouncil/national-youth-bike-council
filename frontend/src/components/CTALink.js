import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * The **CTALink** component renders any call to action link on the page.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */

function CTALink({ type, linkTo, className = '', children }) {
  if (type === 'internal') {
    return (
      <Link
        to={linkTo}
        className={`focus:ring-offset-0.5 inline-block max-w-fit transform rounded-full bg-skin-button-accent px-6 py-2 text-sm uppercase tracking-wide text-skin-muted drop-shadow-md transition hover:-translate-y-0.5 hover:bg-skin-button-accent-hover focus:outline-none focus:ring-1 focus:ring-white lg:text-base ${className}`}
      >
        {children}
      </Link>
    );
  }
  if (type === 'external') {
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noreferrer"
        className={`focus:ring-offset-0.5 inline-block max-w-fit transform rounded-full bg-skin-button-accent px-6 py-2 text-sm uppercase tracking-wide text-skin-muted drop-shadow-md transition hover:-translate-y-0.5 hover:bg-skin-button-accent-hover focus:outline-none focus:ring-1 focus:ring-white lg:text-base ${className}`}
      >
        {children}
      </a>
    );
  }
}

const propTypes = {
  /**
   * Defines the type of the link: whether it is linking to an external page or internal page
   */
  type: PropTypes.oneOf(['external', 'internal']).isRequired,
  /**
   * Sets the url where the CTALink should point to when clicked
   */
  linkTo: PropTypes.string.isRequired,
  /**
   * Sets the content of the CTALink
   */
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

CTALink.displayName = 'CTALink';
CTALink.propTypes = propTypes;

export default CTALink;
