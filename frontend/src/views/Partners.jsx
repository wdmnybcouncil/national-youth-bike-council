import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Section from '../components/Section';
import FilterButton from '../components/FilterButton';
import Accordion from '../components/Accordion';
import DescriptionCard from '../components/DescriptionCard';
import Pagination from '../components/Pagination';

import { partnersImagesAnimationVariants } from '../utils/animationVariants';
import api from '../utils/api';

/**
 * The **Partners** component renders the view that all the partners and information about them.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Partners({ partners }) {
  const [partnersViewTextContent, setPartnersViewTextContent] = useState([]);
  const partnersWithTestimonials = partners.filter((_) => _.attributes.testimonial_text);
  const [faqs, setFaqs] = useState([]);

  //Settings for Filtering Faqs
  const [faqsToShow, setFaqsToShow] = useState(faqs);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('Advocate Membership');
  const filterTagsForFaqs = ['All', ...new Set(faqs.map((_) => _.attributes.title))];

  // Settings for paginating partners
  const [partnersToShow, setPartnersToShow] = useState(partners);

  // Set all the partners to show
  useEffect(() => {
    setPartnersToShow(partners);
  }, [partners]);

  // Get the text contents of the page
  useEffect(() => {
    api
      .getPartnersViewTextContents()
      .then(({ data }) => setPartnersViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Get the partners tiers info
  useEffect(() => {
    api
      .getPartnersTierInfo()
      .then(({ data }) => setFaqs(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  // Show 'Advocate Membership' as the default selected option
  useEffect(() => {
    setSelectedFilterCategory('Advocate Membership');
    setFaqsToShow(faqs.filter((_) => _.attributes.title === 'Advocate Membership'));
  }, []);

  // FAQS: Handle the filtering logic for the selected actegory
  const handleFilterFaqs = (selectedCategory) => {
    let newFaqsToShow;
    newFaqsToShow = selectedCategory !== 'All' ? faqs.filter((_) => _.attributes.title === selectedCategory) : faqs;
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
      const { title, faq_list } = attributes;
      return (
        <div key={title} className="flex flex-col gap-4">
          <h3 className="mb-4 w-full max-w-4xl border-b border-skin-primary pb-1 font-kaleko font-bold tracking-wide text-xl text-skin-primary"> {title}</h3>
          <div>{renderFaqs(faq_list)}</div>
        </div>
      );
    });
  };

  // Partners: Settings for Pagination
  let partnersPageSize = 9;
  const [currentPartnersPage, setCurrentPartnersPage] = useState(1);

  const currentViewPartners = useMemo(() => {
    const firstPageIndex = (currentPartnersPage - 1) * partnersPageSize;
    const lastPageIndex = firstPageIndex + partnersPageSize;
    return partnersToShow.slice(firstPageIndex, lastPageIndex);
  }, [currentPartnersPage, partnersToShow, partnersPageSize]);

  const renderImage = (logo, name) => {
    if (!logo) {
      if (!name) {
        return null;
      }
      // If there is no logo, render name
      return (
        <motion.p
          key={name}
          className="bg-skin-fill-accent p-4 text-center text-lg font-semibold tracking-wide text-skin-muted md:text-xl"
          variants={partnersImagesAnimationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {name}
        </motion.p>
      );
    }
    const { alternate_text, image_file } = logo;
    return (
      <motion.img
        key={alternate_text}
        src={image_file.data.attributes.url}
        alt={alternate_text}
        className="max-h-24 max-w-full object-cover object-center max-h"
        variants={partnersImagesAnimationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    );
  };

  return (
    <>
      {partnersViewTextContent.length ? (
        <div className="my-8" aria-label="Partners page">
          {/* Section # 1 - Invitation to be a partner */}
          <Section>
            <Section.Heading>{partnersViewTextContent[0].attributes.section_heading}</Section.Heading>
            {partnersViewTextContent[0].attributes.section_text ? <Section.Text>{partnersViewTextContent[0].attributes.section_text}</Section.Text> : null}
          </Section>
          {/* Section # 2 - Different Tiers of Partnerships */}
          <Section>
            <Section.Heading>{partnersViewTextContent[1].attributes.section_heading}</Section.Heading>
            {partnersViewTextContent[1].attributes.section_text ? <Section.Text>{partnersViewTextContent[1].attributes.section_text}</Section.Text> : null}
            <div className="mt-4 mb-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">{renderFilterButtons()}</div>
            <div className="flex flex-col gap-6">{renderFaqSections(faqsToShow)}</div>
          </Section>
          {/* Section # 3 - Testimonials */}
          <Section>
            <Section.Heading>{partnersViewTextContent[3].attributes.section_heading}</Section.Heading>
            {partnersViewTextContent[3].attributes.section_text ? <Section.Text>{partnersViewTextContent[3].attributes.section_text}</Section.Text> : null}
            <ul className="mb-8 w-full flex gap-6 lg:gap-x-20 justify-start items-start overflow-x-scroll">
              {partnersWithTestimonials.length
                ? partnersWithTestimonials.map((partner) => (
                    <DescriptionCard
                      key={partner.attributes.testimonial_title}
                      heading={partner.attributes.testimonial_title}
                      text={partner.attributes.testimonial_text}
                      // image={partner.attributes.partner_logo?.image_file.data.attributes.url || ''}
                    />
                  ))
                : null}
            </ul>
          </Section>
          {/* Section # 4 - Our Partners */}
          <Section>
            <Section.Heading>{partnersViewTextContent[2].attributes.section_heading}</Section.Heading>
            {partnersViewTextContent[2].attributes.section_text ? <Section.Text>{partnersViewTextContent[2].attributes.section_text}</Section.Text> : null}
            <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">
              {currentViewPartners.length
                ? currentViewPartners.map((partner) => {
                    const { partner_logo, partner_name } = partner.attributes;
                    return renderImage(partner_logo, partner_name);
                  })
                : null}
            </div>
            <Pagination
              currentPage={currentPartnersPage}
              totalCount={partnersToShow.length}
              pageSize={partnersPageSize}
              onPageChange={(page) => setCurrentPartnersPage(page)}
            />
          </Section>
          {/* Section # 5 - Give Lively dontaion widget */}
          <Section>
            <Section.Heading>{partnersViewTextContent[4].attributes.section_heading}</Section.Heading>
            {partnersViewTextContent[4].attributes.section_text ? <Section.Text>{partnersViewTextContent[4].attributes.section_text}</Section.Text> : null}
            <div className="mx-auto w-full max-w-2xl">
              <div id="give-lively-widget" className="gl-simple-donation-widget"></div>
            </div>
          </Section>
        </div>
      ) : null}
    </>
  );
}

const propTypes = {
  partners: PropTypes.array.isRequired,
};

Partners.displayName = 'Partners';
Partners.propTypes = propTypes;

export default Partners;
