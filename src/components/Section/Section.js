import React from "react";
import PropTypes from "prop-types";
import SectionHeading from "./SectionHeading";
import SectionText from "./SectionText";
import SectionHashtags from "./SectionHashtags";
import SectionImg from "./SectionImg";

/**
 * The **Section** component renders a section in the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Section({ children }) {
  return (
    <section className="w-full bg-skin-fill-base text-skin-base">
      <div className="mx-auto max-w-screen-xl px-8 py-6 md:px-10">{children}</div>
    </section>
  );
}

const propTypes = {
  children: PropTypes.any.isRequired,
};

Section.displayName = "Section";
Section.propTypes = propTypes;

export default Object.assign(Section, {
  Heading: SectionHeading,
  Text: SectionText,
  Hashtags: SectionHashtags,
  Img: SectionImg,
});
