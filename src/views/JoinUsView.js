import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import List from "../components/List";
import FilterButton from "../components/FilterButton";
import Accordion from "../components/Accordion";
import PageLink from "../components/PageLink";

/**
 * The **JoinUsView** component renders the view that all the details about joining the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function JoinUsView({ joinUsView }) {
  const allFaqs = joinUsView[2].faqSections;

  //Settings for Filtering Faqs
  const [faqsToShow, setFaqsToShow] = React.useState(allFaqs);
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState("All");
  const filterTagsForFaqs = ["All", ...new Set(allFaqs.map(_ => _.heading))];

  const handleFilterFaqs = (selectedCategory) => {
    let newFaqsToShow;
    if (selectedCategory !== "All") {
      newFaqsToShow = allFaqs.filter(_ => _.heading === selectedCategory);
    } else {
      newFaqsToShow = allFaqs;
    }
    setSelectedFilterCategory(selectedCategory);
    setFaqsToShow(newFaqsToShow);
  }

  // Helper functions to render fiter butons
  const renderFilterButtons = () => {
    return filterTagsForFaqs.map((filterTag) =>
      <FilterButton
        key={filterTag}
        filterCategory={filterTag}
        selectedFilterCategory={selectedFilterCategory}
        handleFilter={handleFilterFaqs} />);
  }

  // Helper functions to render Faq sections and accordions
  const renderFaqs = (faqs) => {
    return faqs.map(faq => {
      const { heading, content } = faq;
      return (
        <Accordion key={heading} title={heading} content={content} />
      );
    });
  };

  const renderFaqSections = (faqSections) => {
    return faqSections.map(section => {
      const { heading, faqs } = section;
      return (
        <div key={heading} className="flex flex-col gap-4">
          <h3 className="mb-4 w-full max-w-4xl border-b border-skin-primary pb-1 font-balgin text-xl tracking-wider text-skin-primary" > {heading}</h3 >
          <div>
            {renderFaqs(faqs)}
          </div>
        </div>
      );
    });
  }

  const renderListItems = (list) => list.map((item) => <List.Item key={item}>{item}</List.Item>);

  return (
    <>
      <Section>
        <Section.Heading>{joinUsView[0].heading}</Section.Heading>
        <Section.Text>{joinUsView[0].text}</Section.Text>
        <div className="mt-8 flex flex-wrap gap-6 justify-center lg:gap-x-20 xl:justify-start">
          {joinUsView[0].subSections.map(section => (
            <div key={section.heading} className="w-full max-w-xs bg-gray-100 p-4 rounded-lg">
              <h3 className="w-full mb-4 max-w-4xl border-b border-skin-primary pb-1 font-balgin text-xl tracking-wider text-skin-primary" > {section.heading}</h3>
              <Section.Text>{section.text}</Section.Text>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <Section.Heading>{joinUsView[1].heading}</Section.Heading>
        <Section.Text>{joinUsView[1].text}</Section.Text>
        <div className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-x-20 xl:justify-start">
          {joinUsView[1].subSections.map(section => (
            <div key={section.heading} className="w-full max-w-xs bg-gray-100 p-4 rounded-lg">
              <h3 className="w-full max-w-4xl border-b border-skin-primary pb-1 font-balgin text-xl tracking-wider text-skin-primary" > {section.heading}</h3>
              <List>{renderListItems(section.benefits)}</List>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <Section.Heading>{joinUsView[2].heading}</Section.Heading>
        <div className="mb-10 flex flex-wrap gap-4 justify-center items-center md:justify-start md:mb-14">
          {renderFilterButtons()}
        </div>
        <div className="flex flex-col gap-6">
          {renderFaqSections(faqsToShow)}
        </div>
      </Section>
      <Section>
        <Section.Heading>{joinUsView[3].heading}</Section.Heading>
        <Section.Text>{joinUsView[3].text}</Section.Text>
        <PageLink type="external" linkTo={joinUsView[3].link}>Join the Efforts</PageLink>
      </Section>
    </>
  );
}

const propTypes = {
  joinUsView: PropTypes.array.isRequired,
}

JoinUsView.displayName = "JoinUsView";
JoinUsView.propTypes = propTypes;

export default JoinUsView;
