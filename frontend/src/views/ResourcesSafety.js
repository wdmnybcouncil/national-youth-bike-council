import React from "react";
import Section from "../components/Section";
import CTALink from "../components/CTALink";
import api from "../utils/api";

/**
 * The **ResourcesSafety** component renders the `Resources & Safety` view of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ResourcesSafety() {
  const [resourcesSafetyViewTextContent, setResourcesSafetyViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getResourcesSafetyViewTextContents()
      .then(({ data }) => setResourcesSafetyViewTextContent(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const renderSection = (section) => {
    const { section_heading, section_text, section_image } = section.attributes;
    const { image_file, alternate_text } = section_image;

    return (
      // Sections - Resources, Safety, Contribution to Community & Word of Mouth
      <>
        <Section.Heading>{section_heading}</Section.Heading >
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
          <div className="col-span-2">
            <Section.Text>{section_text}</Section.Text>
          </div>
          <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
            <Section.Img
              src={image_file.data.attributes.url}
              alt={alternate_text}
              className="object-cover object-center" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {resourcesSafetyViewTextContent.length
        ? (
          <div className="my-8" aria-label="resources page">
            <Section>
              {/* Section # 1 - Resources */}
              {renderSection(resourcesSafetyViewTextContent[0])}
              <CTALink type="external" linkTo="https://docs.google.com/forms/d/e/1FAIpQLSdDT9g_BE_74NJzbmh2s9M8CCrg0aU_TCUze4-FCPNkEcZx-Q/viewform" className="mt-4 self-center xs:self-start">
                Donate
              </CTALink>
            </Section>
            <Section>
              {/* Section # 2 - Safety */}
              {renderSection(resourcesSafetyViewTextContent[1])}
            </Section>
            <Section>
              {/* Section # 3 - Contribution to Community */}
              {renderSection(resourcesSafetyViewTextContent[2])}
            </Section>
            <Section>
              {/* Section # 4 - Word of Mouth */}
              {renderSection(resourcesSafetyViewTextContent[3])}
            </Section>
          </div>
        )
        : null}
    </>
  );
}

ResourcesSafety.displayName = "ResourcesSafety";

export default ResourcesSafety;
