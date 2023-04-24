import PropTypes from 'prop-types';

/**
 * The **SectionTags** component renders the tags of a section in the webpage.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function SectionTags({ children }) {
  return (
    <div className="flex flex-wrap gap-2">
      {children.map((item) => (
        <p key={item} className="rounded-lg bg-gray-100 px-2 py-1 text-sm italic leading-6 tracking-wide text-skin-primary">{item}</p>
      ))}
    </div>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

SectionTags.displayName = 'SectionTags';
SectionTags.propTypes = propTypes;

export default SectionTags;
