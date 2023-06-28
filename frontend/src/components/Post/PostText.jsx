import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

/**
 * The **PostText** component renders a text for post in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function PostText({ children }) {
  return <ReactMarkdown className="markdown my-4 flex-grow text-sm">{children}</ReactMarkdown>;
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

PostText.displayName = 'PostText';
PostText.propTypes = propTypes;

export default PostText;
