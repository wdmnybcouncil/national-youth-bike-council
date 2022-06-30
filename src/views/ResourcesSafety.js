import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";

/**
 * The **ResourcesSafety** component renders the `Resources & Safety` view of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ResourcesSafety({ resourcesSafetyView }) {
  const renderSectionTexts = (texts) => texts.map((text, index) => <Section.Text key={`${index}-${text.substring(0, 10)}`}>{text}</Section.Text>);

  const renderSections = () =>
    resourcesSafetyView.map((section, index) => {
      const { heading, text, img } = section;
      return (
        // Sections - Resources, Safety, Contribution to Community & Word of Mouth
        <Section key={`${index}-${heading}`}>
          <Section.Heading>{heading}</Section.Heading>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
            <div className="col-span-2 flex flex-col gap-8">{renderSectionTexts(text)}</div>
            <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
              <Section.Img src={img.src} alt={img.alt} className="object-cover object-center" />
            </div>
          </div>
        </Section>
      );
    });

  return <div className="my-8">{renderSections()}</div>;
}

const propTypes = {
  resourcesSafetyView: PropTypes.array.isRequired,
};

ResourcesSafety.displayName = "ResourcesSafety";
ResourcesSafety.propTypes = propTypes;

export default ResourcesSafety;
