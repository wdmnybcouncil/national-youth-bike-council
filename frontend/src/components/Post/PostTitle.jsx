import PropTypes from 'prop-types';

/**
 * The **PostTitle** component renders a title for post in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function PostTitle({ children }) {
  return (
    <h3 className="relative mb-1 w-full border-b border-skin-accent pb-1 text-center font-kaleko font-bold tracking-wide text-xl md:text-2xl lg:text-left">
      {children}
    </h3>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

PostTitle.displayName = 'PostTitle';
PostTitle.propTypes = propTypes;

export default PostTitle;
