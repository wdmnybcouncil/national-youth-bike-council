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
        // Sections - Community, Health, Education, Leadership
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
      {/* Section # 1 - Why the National Youth Bike Council? */}
      <section className="mb-10 w-full bg-skin-fill-card-accent text-skin-base">
        <div className="mx-auto max-w-screen-xl px-8 py-6 md:px-10">
          <h2 className="mb-4 w-full font-balgin text-2xl capitalize text-skin-accent md:pb-2 md:text-4xl tracking-wider">In Two Sentences</h2>
          <p className="max-w-3xl"><span className="font-semibold">Community, Health, Education</span> and <span className="font-semibold">Leadership</span> is the second way to say <span className="font-semibold">“National Youth Bike Council”</span>. Young people within the council have the opportunity to develop hard skills, leadership skills, and a healthy lifestyle.</p>
        </div>
      </section>
      {renderSections()}
      {/* Section # 6 - Instruction to tag National Youth Bike Council on social media */}
      <section className="mt-10 w-full bg-skin-fill-card-accent text-skin-base">
        <div className="mx-auto max-w-screen-xl px-8 py-6 md:px-10">
          <p className="max-w-3xl">@ us with any of these Hashtags!</p>
        </div>
      </section>
    </>
  );
}

const propTypes = {
  data: PropTypes.array.isRequired,
};

WhyTheCouncil.displayName = "WhyTheCouncil";
WhyTheCouncil.propTypes = propTypes;

export default WhyTheCouncil;
