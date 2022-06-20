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
function CouncilMembers({ councilMembers = [], alumniMembers = [], onCardClick }) {
  const renderCouncilMemberCards = () =>
    councilMembers.map((member) => {
      const { firstName, lastName, img, roles, location, story } = member;
      const userProfile = {
        userName: `${firstName} ${lastName.substring(0, 1)}.`,
        userImg: img,
        userStory: story.detail,
      };
      return (
        <ProfileCard key={`${firstName}-${lastName}`} className="xs:min-w-72 mx-auto w-64 lg:w-full" onCardClick={onCardClick} userProfile={userProfile}>
          <ProfileCard.Img src={img} alt={`${firstName} ${lastName}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${firstName} ${lastName.substring(0, 1)}.`}</ProfileCard.Title>
          <ProfileCard.Subtitle>{roles[0]}</ProfileCard.Subtitle>
          <ProfileCard.Location>{location}</ProfileCard.Location>
        </ProfileCard>
      );
    });

  const renderAlumniCards = () =>
    alumniMembers.map(({ img }, index) => (
      <img key={index} src={img} alt="alumni profile" className="h-40 w-40 max-w-full rounded-full border-4 border-skin-accent object-cover object-center" />
    ));

  return (
    <>
      {/* Section # 1 - Meet the Council Members */}
      <Section>
        <Section.Heading>Meet the Council Members</Section.Heading>
        <div className="flex flex-wrap gap-6">{councilMembers.length && renderCouncilMemberCards()}</div>
      </Section>
      {/* Section # 2 - Alumni */}
      <Section>
        <Section.Heading>Alumni</Section.Heading>
        <div className="flex flex-wrap justify-center gap-8 md:justify-evenly md:gap-0">{alumniMembers && renderAlumniCards()}</div>
      </Section>
    </>
  );
}

const propTypes = {
  councilMembers: PropTypes.array.isRequired,
  alumniMembers: PropTypes.array.isRequired,
};

CouncilMembers.displayName = "CouncilMembers";
CouncilMembers.propTypes = propTypes;

export default CouncilMembers;
