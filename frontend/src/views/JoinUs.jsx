import { useState, useEffect } from 'react';
import Section from '../components/Section';
import DescriptionCard from '../components/DescriptionCard';
import FilterButton from '../components/FilterButton';
import Accordion from '../components/Accordion';
import CTALink from '../components/CTALink';
import api from '../utils/api';

/**
 * The **JoinUs** component renders the view that all the details about joining the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function JoinUs() {
  const [joinUsViewTextContent, setJoinUsViewTextContent] = useState([]);
  const [joinUsBenefits, setJoinUsBenefits] = useState([]);
  const [joinUsRoles, setJoinUsRoles] = useState([]);
  const [faqs, setFaqs] = useState([]);

  //Settings for Filtering Faqs
  const [faqsToShow, setFaqsToShow] = useState(faqs);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
  const filterTagsForFaqs = ['All', ...new Set(faqs.map((_) => _.attributes.faq_title))];

  // Get the text contents of the page
  useEffect(() => {
    api
      .getJoinUsViewTextContents()
      .then(({ data }) => setJoinUsViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the benefits of joining the council
  useEffect(() => {
    api
      .getJoinUsBenefits()
      .then(({ data }) => setJoinUsBenefits(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the roles for joining the council
  useEffect(() => {
    api
      .getJoinUsRoles()
      .then(({ data }) => setJoinUsRoles(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the faqs
  useEffect(() => {
    api
      .getFaqs()
      .then(({ data }) => {
        setFaqs(data);
        setFaqsToShow(data);
      })
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Handle the filtering logic for the selected actegory
  const handleFilterFaqs = (selectedCategory) => {
    let newFaqsToShow;
    newFaqsToShow = selectedCategory !== 'All' ? faqs.filter((_) => _.attributes.faq_title === selectedCategory) : faqs;
    setSelectedFilterCategory(selectedCategory);
    setFaqsToShow(newFaqsToShow);
  };

  // Helper functions to render fiter butons
  const renderFilterButtons = () => {
    return filterTagsForFaqs.map((filterTag) => (
      <FilterButton key={filterTag} filterCategory={filterTag} selectedFilterCategory={selectedFilterCategory} handleFilter={handleFilterFaqs} />
    ));
  };

  // Helper functions to render Faq sections and accordions
  const renderFaqs = (faqs) => faqs.map(({ heading, description }) => <Accordion key={heading} title={heading} content={description} />);

  const renderFaqSections = (faqSections) => {
    return faqSections.map(({ attributes }) => {
      const { faq_title, faq_list } = attributes;
      return (
        <div key={faq_title} className="flex flex-col gap-4">
          <h3 className="mb-4 w-full max-w-4xl border-b border-skin-primary pb-1 font-kaleko font-bold tracking-wide text-xl text-skin-primary">
            {' '}
            {faq_title}
          </h3>
          <div>{renderFaqs(faq_list)}</div>
        </div>
      );
    });
  };

  return (
    <>
      {joinUsViewTextContent.length ? (
        <div className="my-8" aria-label="join us page">
          {/* Section # 1 - Which One Are You? */}
          <Section>
            <Section.Heading>{joinUsViewTextContent[0].attributes.section_heading}</Section.Heading>
            {joinUsViewTextContent[0].attributes.section_text ? <Section.Text>{joinUsViewTextContent[0].attributes.section_text}</Section.Text> : null}
            <div className="mt-12 flex flex-wrap justify-center gap-12 lg:gap-x-20 xl:justify-start">
              {joinUsRoles.length
                ? joinUsRoles.map((section) => (
                    <DescriptionCard
                      key={section.attributes.role_title}
                      heading={section.attributes.role_title}
                      text={section.attributes.role_description}
                      image={section.attributes.role_image?.image_file.data.attributes.url}
                      enableAnimation={true}
                    />
                  ))
                : null}
            </div>
          </Section>
          {/* Section # 2- Benefits */}
          <Section>
            <Section.Heading>{joinUsViewTextContent[1].attributes.section_heading}</Section.Heading>
            {joinUsViewTextContent[1].attributes.section_text ? <Section.Text>{joinUsViewTextContent[1].attributes.section_text}</Section.Text> : null}
            <div className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-x-20 xl:justify-start">
              {joinUsBenefits.length
                ? joinUsBenefits.map((section) => (
                    <DescriptionCard key={section.attributes.role_title} heading={section.attributes.role_title} text={section.attributes.role_benefits} />
                  ))
                : null}
            </div>
          </Section>
          {/* Section # 3 - Join The Efforts */}
          <Section>
            <Section.Heading>{joinUsViewTextContent[3].attributes.section_heading}</Section.Heading>
            {joinUsViewTextContent[3].attributes.section_text ? <Section.Text>{joinUsViewTextContent[3].attributes.section_text}</Section.Text> : null}
            <CTALink
              type="external"
              linkTo="https://docs.google.com/forms/d/e/1FAIpQLSfCLjXlghaJvNn8ijeqImKdB6KO1Mtx4bcfxqJRhns3xpxw6w/viewform?usp=sf_link"
              className="mt-4 self-center xs:self-start"
            >
              Join the Efforts
            </CTALink>
          </Section>
          {/* Section # 4 - Frequently Asked Questions */}
          <Section>
            <Section.Heading>{joinUsViewTextContent[2].attributes.section_heading}</Section.Heading>
            <div className="mb-10 flex flex-wrap items-center justify-center gap-4 md:mb-14 md:justify-start">{renderFilterButtons()}</div>
            <div className="flex flex-col gap-6">{renderFaqSections(faqsToShow)}</div>
          </Section>
        </div>
      ) : null}
    </>
  );
}

JoinUs.displayName = 'JoinUs';

export default JoinUs;
