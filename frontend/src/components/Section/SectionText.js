import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * The **SectionText** component renders the text of a section in the webpage.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function SectionText({ className, children }) {
  return <ReactMarkdown linkTarget="_blank" rehypePlugins={[rehypeRaw]} className={`markdown ${className}`}>{children}</ReactMarkdown>;
}

const propTypes = {
  className: PropTypes.any,
  children: PropTypes.any.isRequired,
};

SectionText.displayName = 'SectionText';
SectionText.propTypes = propTypes;

export default SectionText;
