import React from "react";
import Section from "../components/Section";
import FilterButton from "../components/FilterButton";
import Accordion from "../components/Accordion";
import api from "../utils/api";

/**
 * The **JoinUs** component renders the view that all the details about joining the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function JoinUs() {
  const [joinUsViewTextContent, setJoinUsViewTextContent] = React.useState([]);
  const [joinUsBenefits, setJoinUsBenefits] = React.useState([]);
  const [joinUsRoles, setJoinUsRoles] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getJoinUsViewTextContents()
      .then(({ data }) => setJoinUsViewTextContent(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  // Get the benefits of joining the council
  React.useEffect(() => {
    api.getJoinUsBenefits()
      .then(({ data }) => setJoinUsBenefits(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  // Get the roles for joining the council
  React.useEffect(() => {
    api.getJoinUsRoles()
      .then(({ data }) => setJoinUsRoles(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  // Get the faqs
  React.useEffect(() => {
    api.getFaqs()
      .then(({ data }) => {
        setFaqs(data);
        setFaqsToShow(data);
      })
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  //Settings for Filtering Faqs
  const [faqsToShow, setFaqsToShow] = React.useState(faqs);
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState("All");
  const filterTagsForFaqs = ["All", ...new Set(faqs.map((_) => _.attributes.faq_title))];

  const handleFilterFaqs = (selectedCategory) => {
    let newFaqsToShow;
    if (selectedCategory !== "All") {
      newFaqsToShow = faqs.filter((_) => _.attributes.faq_title === selectedCategory);
    } else {
      newFaqsToShow = faqs;
    }
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
  const renderFaqs = (faqs) => {
    return faqs.map((faq) => {
      const { heading, description } = faq;
      return <Accordion key={heading} title={heading} content={description} />;
    });
  };

  const renderFaqSections = (faqSections) => {
    return faqSections.map((section) => {
      const { faq_title, faq_list } = section.attributes;
      return (
        <div key={faq_title} className="flex flex-col gap-4">
          <h3 className="mb-4 w-full max-w-4xl border-b border-skin-primary pb-1 font-balgin text-xl tracking-wider text-skin-primary"> {faq_title}</h3>
          <div>{renderFaqs(faq_list)}</div>
        </div>
      );
    });
  };

  return (
    <>
      {
        (joinUsViewTextContent.length)
          ? (
            <div className="my-8" aria-label="join us page">
              <Section>
                <Section.Heading>{joinUsViewTextContent[0].attributes.section_heading}</Section.Heading>
                {(joinUsViewTextContent[0].attributes.section_text)
                  ? (
                    <Section.Text>
                      {joinUsViewTextContent[0].attributes.section_text}
                    </Section.Text>
                  )
                  : null}
                <div className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-x-20 xl:justify-start">
                  {(joinUsRoles.length)
                    ? (
                      joinUsRoles.map((section) => (
                        <div key={section.attributes.role_title} className="w-full max-w-xs rounded-lg bg-gray-100 p-4">
                          <h3 className="mb-4 w-full max-w-4xl border-b border-skin-primary pb-1 font-balgin text-xl tracking-wider text-skin-primary">
                            {" "}
                            {section.attributes.role_title}
                          </h3>
                          <Section.Text>{section.attributes.role_description}</Section.Text>
                        </div>
                      ))
                    )
                    : null}
                </div>
              </Section>
              <Section>
                <Section.Heading>{joinUsViewTextContent[1].attributes.section_heading}</Section.Heading>
                {
                  (joinUsViewTextContent[1].attributes.section_text)
                    ? (
                      <Section.Text>
                        {joinUsViewTextContent[1].attributes.section_text}
                      </Section.Text>
                    )
                    : null
                }
                <div className="mt-8 flex flex-wrap justify-center gap-6 lg:gap-x-20 xl:justify-start">
                  {(joinUsBenefits.length)
                    ? (
                      joinUsBenefits.map((section) => (
                        <div key={section.attributes.role_title} className="w-full max-w-xs rounded-lg bg-gray-100 p-4">
                          <h3 className="w-full max-w-4xl border-b border-skin-primary pb-1 font-balgin text-xl tracking-wider text-skin-primary"> {section.attributes.role_title}</h3>
                          <Section.Text>{section.attributes.role_benefits}</Section.Text>
                        </div>
                      ))
                    )
                    : null}
                </div>
              </Section>
              <Section>
                <Section.Heading>{joinUsViewTextContent[2].attributes.section_heading}</Section.Heading>
                <div className="mb-10 flex flex-wrap items-center justify-center gap-4 md:mb-14 md:justify-start">{renderFilterButtons()}</div>
                <div className="flex flex-col gap-6">{renderFaqSections(faqsToShow)}</div>
              </Section>
              <Section>
                <Section.Heading>{joinUsViewTextContent[3].attributes.section_heading}</Section.Heading>
                {
                  (joinUsViewTextContent[3].attributes.section_text)
                    ? (
                      <Section.Text>{joinUsViewTextContent[3].attributes.section_text}</Section.Text>
                    )
                    : null
                }
              </Section>
            </div >
          )
          : null
      }
    </>
  );
}

JoinUs.displayName = "JoinUs";

export default JoinUs;
