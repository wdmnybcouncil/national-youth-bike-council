import React from "react";
import PropTypes from "prop-types";

/**
 * The **Accordion** component renders each Accordion in the page.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Accordion({ title, content }) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="max-w-4xl border m-0 rounded-lg overflow-hidden hover:border-skin-accent">
      <button className={`group w-full py-2 px-4 flex justify-between items-center transtion hover:bg-skin-fill-card-accent hover:text-skin-accent focus:bg-skin-fill-card-accent focus:text-skin-accent`} onClick={() => setIsActive(!isActive)}>
        <p className="font-semibold text-left">{title}</p>
        <p className="w-[30px] h-[30px] flex-shrink-0 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-skin-fill-accent group-hover:text-skin-muted group-focus:bg-skin-fill-accent group-focus:text-skin-muted">{isActive ? '-' : '+'}</p>
      </button>
      {isActive && <p className="p-4">{content}</p>}
    </div >
  );
};

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Accordion.displayName = "Accordion";
Accordion.propTypes = propTypes;

export default Object.assign(Accordion, {
});
