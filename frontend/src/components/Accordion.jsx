import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * The **Accordion** component renders each Accordion in the page.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="m-0 max-w-4xl overflow-hidden rounded-lg border hover:border-skin-accent">
      <button
        className={`transtion group flex w-full items-center justify-between py-2 px-4 hover:bg-skin-fill-card-accent hover:text-skin-accent focus:bg-skin-fill-card-accent focus:text-skin-accent`}
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-left font-semibold">{title}</p>
        <p className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-gray-200 group-hover:bg-skin-fill-accent group-hover:text-skin-muted group-focus:bg-skin-fill-accent group-focus:text-skin-muted">
          {isActive ? '-' : '+'}
        </p>
      </button>
      {isActive && (
        <ReactMarkdown linkTarget="_blank" rehypePlugins={[rehypeRaw]} className={`markdown p-4`}>
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Accordion.displayName = 'Accordion';
Accordion.propTypes = propTypes;

export default Object.assign(Accordion, {});
