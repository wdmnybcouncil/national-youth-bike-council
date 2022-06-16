import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";

/**
 * The **CouncilMembers** component renders the view that lists all the members of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function CouncilMembers({ data }) {
  const renderCurrentMemberCards = () => {
    const currentMembers = data.filter((item) => item.roles.includes("Council Member"));

    return currentMembers.map((member) => {
      const { firstName, lastName, img, roles, location } = member;

      return (
        <ProfileCard className="xs:min-w-72 mx-auto w-64 lg:w-full">
          <ProfileCard.Img src={img} alt={`${firstName} ${lastName}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${firstName} ${lastName.substring(0, 1)}.`}</ProfileCard.Title>
          <ProfileCard.Subtitle>{roles[0]}</ProfileCard.Subtitle>
          <ProfileCard.Location>{location}</ProfileCard.Location>
        </ProfileCard>
      );
    });
  };

  const renderAlumniCards = () => {
    const alumni = data.filter((item) => item.roles.includes("Alumni"));
    return alumni.map(({ img }) => (
      <img src={img} alt="alumni profile" className="h-40 w-40 max-w-full rounded-full border-4 border-skin-accent object-cover object-center" />
    ));
  };

  return (
    <>
      {/* Section # 1 - Meet the Council Members */}
      <Section>
        <Section.Heading>Meet the Council Members</Section.Heading>
        <div className="flex flex-wrap gap-6">{renderCurrentMemberCards()}</div>
      </Section>
      {/* Section # 2 - Alumni */}
      <Section>
        <Section.Heading>Alumni</Section.Heading>
        <div className="flex flex-wrap justify-center gap-8 md:justify-evenly md:gap-0">{renderAlumniCards()}</div>
      </Section>
    </>
  );
}

const propTypes = {
  data: PropTypes.array.isRequired,
};

CouncilMembers.displayName = "CouncilMembers";
CouncilMembers.propTypes = propTypes;

export default CouncilMembers;
