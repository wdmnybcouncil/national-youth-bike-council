import { useState, useEffect } from 'react';
import Section from '../components/Section';
import api from '../utils/api';

/**
 * The **WhyTheCouncil** component renders the `Why The Council` view of the website.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function WhyTheCouncil() {
  const [whyTheCouncilViewTextContent, setWhyTheCouncilViewTextContent] = useState([]);

  // Get the text contents of the page
  useEffect(() => {
    api.getWhyTheCouncilViewTextContents()
      .then(({ data }) => setWhyTheCouncilViewTextContent(data))
      .catch(err => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  const renderSections = () =>
    whyTheCouncilViewTextContent.map(({ attributes }) => {
      const { section_heading, section_text, section_hashtags, section_image } = attributes;
      return (
        // Sections - Community, Health, Education, Leadership
        <Section key={section_heading}>
          <Section.Heading>{section_heading}</Section.Heading>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
            <div className="col-span-2 flex flex-col gap-8">
              {(section_text) ? <Section.Text>{section_text}</Section.Text> : null}
              {(section_hashtags) ? <Section.Tags>{section_hashtags}</Section.Tags> : null}
            </div>
            <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
              {(section_image)
                ? (
                  <Section.Img
                    src={section_image.image_file.data.attributes.url}
                    alt={section_image.alternate_text}
                    className="rounded-md border-4 border-skin-accent object-cover object-center" />
                )
                : null}
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
                <h2 className="mb-4 w-full font-kaleko font-bold tracking-wide text-2xl capitalize text-skin-accent md:pb-2 md:text-4xl">In Two Sentences</h2>
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

WhyTheCouncil.displayName = 'WhyTheCouncil';

export default WhyTheCouncil;
