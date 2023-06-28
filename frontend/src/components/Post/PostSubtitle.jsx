import PropTypes from 'prop-types';

/**
 * The **PostSubtitle** component renders a title for post in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function PostSubtitle({ children }) {
  return <p className="text-center text-sm font-semibold lg:text-left">{children}</p>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

PostSubtitle.displayName = 'PostSubtitle';
PostSubtitle.propTypes = propTypes;

export default PostSubtitle;
