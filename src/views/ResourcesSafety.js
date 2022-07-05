import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import CTALink from "../components/CTALink";

/**
 * The **ResourcesSafety** component renders the `Resources & Safety` view of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ResourcesSafety({ resourcesSafetyView }) {
  const renderSectionTexts = (texts) => texts.map((text, index) => <Section.Text key={`${index}-${text.substring(0, 10)}`}>{text}</Section.Text>);

  const renderSection = (section) => {
    const { heading, text, img } = section;
    return (
      // Sections - Resources, Safety, Contribution to Community & Word of Mouth
      <>
        < Section.Heading > {heading}</Section.Heading >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
          <div className="col-span-2 flex flex-col gap-8">{renderSectionTexts(text)}</div>
          <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
            <Section.Img src={img.src} alt={img.alt} className="object-cover object-center" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="my-8">
      <Section>
        {/* Section # 1 - Resources */}
        {renderSection(resourcesSafetyView[0])}
      </Section>
      <Section>
        {/* Section # 2 - Safety */}
        {renderSection(resourcesSafetyView[1])}
      </Section>
      <Section>
        {/* Section # 3 - Contribution to Community */}
        {renderSection(resourcesSafetyView[2])}
      </Section>
      <Section>
        {/* Section # 4 - Word of Mouth */}
        {renderSection(resourcesSafetyView[3])}
        <CTALink type="external" linkTo="https://docs.google.com/forms/d/e/1FAIpQLSdDT9g_BE_74NJzbmh2s9M8CCrg0aU_TCUze4-FCPNkEcZx-Q/viewform" className="mt-4 self-center xs:self-start">
          Donate
        </CTALink>
      </Section>
    </div>
  );
}

const propTypes = {
  resourcesSafetyView: PropTypes.array.isRequired,
};

ResourcesSafety.displayName = "ResourcesSafety";
ResourcesSafety.propTypes = propTypes;

export default ResourcesSafety;
