import React from "react";
import Section from "../components/Section";
import api from "../utils/api";

/**
 * The **WhyTheCouncil** component renders the `Why The Council` view of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function WhyTheCouncil() {
  const [whyTheCouncilViewTextContent, setWhyTheCouncilViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getWhyTheCouncilViewTextContents()
      .then(response => setWhyTheCouncilViewTextContent(response.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const renderSections = () =>
    whyTheCouncilViewTextContent.map((section) => {
      const { section_heading, section_text, section_hashtags, section_image } = section.attributes;
      const { alternate_text, image_file } = section_image;
      return (
        // Sections - Community, Health, Education, Leadership
        <Section key={section_heading}>
          <Section.Heading>{section_heading}</Section.Heading>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
            <div className="col-span-2 flex flex-col gap-8">
              <Section.Text>{section_text}</Section.Text>
              <Section.Hashtags>{section_hashtags}</Section.Hashtags>
            </div>
            <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
              <Section.Img src={image_file.data.attributes.url} alt={alternate_text} className="rounded-md border-4 border-skin-accent object-cover object-center" />
            </div>
          </div>
        </Section>
      );
    });

  return (
    <>
      {whyTheCouncilViewTextContent.length
        ? (
          <div className="my-8" aria-label="why the council page">
            {/* Section # 1 - Why the National Youth Bike Council? */}
            <section className="mb-10 w-full bg-skin-fill-card-accent text-skin-base">
              <div className="mx-auto max-w-screen-xl px-8 py-6 md:px-10">
                <h2 className="mb-4 w-full font-balgin text-2xl capitalize tracking-wider text-skin-accent md:pb-2 md:text-4xl">In Two Sentences</h2>
                <p className="max-w-3xl">
                  <span className="font-semibold">Community, Health, Education</span> and <span className="font-semibold">Leadership</span> is the second way to say{" "}
                  <span className="font-semibold">“National Youth Bike Council”</span>. Young people within the council have the opportunity to develop hard skills,
                  leadership skills, and a healthy lifestyle.
                </p>
              </div>
            </section>
            {renderSections()}
            {/* Section # 6 - Instruction to tag National Youth Bike Council on social media */}
            <section className="mt-10 w-full bg-skin-fill-card-accent text-skin-base">
              <div className="mx-auto max-w-screen-xl px-8 py-6 md:px-10">
                <p className="max-w-3xl">@ us with any of these Hashtags!</p>
              </div>
            </section>
          </div>
        )
        : null}
    </>
  );
}

WhyTheCouncil.displayName = "WhyTheCouncil";

export default WhyTheCouncil;
