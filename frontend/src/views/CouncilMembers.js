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
function CouncilMembers({ councilMembersView, councilMembers = [], alumniMembers = [], onCardClick }) {
  const renderCouncilMemberCards = () =>
    councilMembers.map((member) => {
      const { first_name, last_name, profile_image, roles, location, story_in_detail } = member.attributes;
      const img = profile_image.data.attributes.url;
      const userProfile = {
        userName: `${first_name} ${last_name.substring(0, 1)}.`,
        userImg: img,
        userStory: story_in_detail,
      };
      return (
        <ProfileCard key={`${first_name}-${last_name}`} className="xs:min-w-72 mx-auto w-64 lg:w-full" onCardClick={onCardClick} userProfile={userProfile}>
          <ProfileCard.Img src={img} alt={`${first_name} ${last_name}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${first_name} ${last_name.substring(0, 1)}.`}</ProfileCard.Title>
          <ProfileCard.Subtitle>{roles[0]}</ProfileCard.Subtitle>
          <ProfileCard.Location>{location}</ProfileCard.Location>
        </ProfileCard>
      );
    });

  const renderAlumniCards = () =>
    alumniMembers.map((member, index) => {
      const { profile_image } = member.attributes;
      return (
        <img key={index} src={profile_image.data.attributes.url} alt="alumni profile" className="h-40 w-40 max-w-full rounded-full border-4 border-skin-accent object-cover object-center" />
      )
    });

  return (
    <div className="my-8" aria-label="council members page">
      {/* Section # 1 - Meet the Council Members */}
      <Section>
        <Section.Heading>{councilMembersView[0].heading}</Section.Heading>
        <div className="flex flex-wrap gap-6">{councilMembers.length && renderCouncilMemberCards()}</div>
      </Section>
      {/* Section # 2 - Alumni */}
      <Section>
        <Section.Heading>{councilMembersView[1].heading}</Section.Heading>
        <div className="flex flex-wrap justify-center gap-8 md:justify-evenly md:gap-0">{alumniMembers && renderAlumniCards()}</div>
      </Section>
    </div>
  );
}

const propTypes = {
  councilMembersView: PropTypes.array.isRequired,
  councilMembers: PropTypes.array.isRequired,
  alumniMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

CouncilMembers.displayName = "CouncilMembers";
CouncilMembers.propTypes = propTypes;

export default CouncilMembers;
