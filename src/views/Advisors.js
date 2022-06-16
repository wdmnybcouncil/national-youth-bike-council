import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";
import List from "../components/List/List";
import CTALink from "../components/CTALink";
import btnArrow from "../assets/images/btn-arrow.svg";

/**
 * The **Advisors** component renders the view that tells about the role of advisors in the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Advisors({ advisorsView, advisorMembers = [] }) {
  const renderSectionTexts = (texts) => texts.map((text, index) => <Section.Text key={`${index}-${text.substring(0, 10)}`}>{text}</Section.Text>);
  const renderListItems = (list) => list.map((item) => <List.Item key={item}>{item}</List.Item>);

  const renderAdvisorMemberCards = () =>
    advisorMembers.map((member) => {
      const { firstName, lastName, img, roles, location } = member;
      return (
        <ProfileCard key={`${firstName}-${lastName}`} className="xs:min-w-72 mx-auto w-64 lg:w-full">
          <ProfileCard.Img src={img} alt={`${firstName} ${lastName}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${firstName} ${lastName.substring(0, 1)}.`}</ProfileCard.Title>
          <ProfileCard.Subtitle>{roles[0]}</ProfileCard.Subtitle>
          <ProfileCard.Location>{location}</ProfileCard.Location>
        </ProfileCard>
      );
    });

  return (
    <>
      {/* Section # 1 - Who are Advisors? */}
      <Section>
        <Section.Heading>{advisorsView[0].heading}</Section.Heading>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
          <div className="col-span-2 flex flex-col gap-8">{renderSectionTexts(advisorsView[0].text)}</div>
          <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
            <Section.Img src={advisorsView[0].img.src} alt={advisorsView[0].img.alt} className="object-cover object-center" />
          </div>
        </div>
      </Section>
      {/* Section # 2 - Meet the Advisors */}
      <Section>
        <Section.Heading>{advisorsView[1].heading}</Section.Heading>
        <div className="flex flex-wrap gap-6">{advisorMembers.length && renderAdvisorMemberCards()}</div>
      </Section>
      {/* Section # 3 - How to Become  */}
      <Section>
        <Section.Heading>{advisorsView[2].heading}</Section.Heading>
        <div className="flex flex-col">
          {renderSectionTexts(advisorsView[2].text)}
          <List>{renderListItems(advisorsView[2].areasOfExpertise)}</List>
          <a
            href="https://docs.google.com/document/d/1IY-epyZT0j91pbPX4uls_dMo76dzlP_4E_0Anj56d3Y/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="gap- 2 mt-4 flex underline underline-offset-4 transition-all hover:decoration-skin-accent hover:opacity-90"
          >
            Click here to see full descriptions
          </a>
          <CTALink linkTo="" className="mt-4 self-center xs:self-start">
            Join us
            <img src={btnArrow} alt="arrow on button" className="ml-2 inline h-5" />
          </CTALink>
        </div>
      </Section>
    </>
  );
}

const propTypes = {
  advisorsView: PropTypes.array.isRequired,
  advisorMembers: PropTypes.array.isRequired,
};

Advisors.displayName = "Advisors";
Advisors.propTypes = propTypes;

export default Advisors;
