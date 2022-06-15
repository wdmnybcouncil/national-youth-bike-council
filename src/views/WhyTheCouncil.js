import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";

/**
 * The **WhyTheCouncil** component renders the `Why The Council` view of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function WhyTheCouncil({ data }) {
  const renderSectionTexts = (texts) => (
    texts.map((text, index) => (
      <Section.Text key={`${index}-${text.substring(0, 10)}`}>
        {text}
      </Section.Text>)
    )
  )

  const renderSections = () => (
    data.map((section, index) => {
      const {
        heading,
        text,
        hashtags,
        img,
      } = section;
      return (
        <Section key={`${index}-${heading}`}>
          <Section.Heading>{heading}</Section.Heading>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
            <div className="col-span-2 flex flex-col gap-8">
              {renderSectionTexts(text)}
              <Section.Hashtags>{hashtags}</Section.Hashtags>
            </div>
            <div className="col-span-2 place-self-center sm:justify-self-end">
              <Section.Img src={img.src} alt={img.alt} className="object-cover object-center" />
            </div>
          </div>
        </Section>
      );
    })
  )

  return (
    <>
      {renderSections()}
    </>
  );
}

const propTypes = {
  data: PropTypes.array.isRequired,
};

WhyTheCouncil.displayName = "WhyTheCouncil";
WhyTheCouncil.propTypes = propTypes;

export default WhyTheCouncil;
