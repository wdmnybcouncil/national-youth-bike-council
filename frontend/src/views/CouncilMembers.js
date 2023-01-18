import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";
import api from "../utils/api";

/**
 * The **CouncilMembers** component renders the view that lists all the members of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function CouncilMembers({ councilMembers = [], alumniMembers = [], onCardClick }) {
  const [councilMembersViewTextContent, setCouncilMembersViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getCouncilMembersViewTextContents()
      .then(({ data }) => setCouncilMembersViewTextContent(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const renderCouncilMemberCards = () =>
    councilMembers.map((member) => {
      const { first_name, last_name, profile_image, designation, location, story_in_detail } = member.attributes;
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
          <ProfileCard.Subtitle>{designation}</ProfileCard.Subtitle>
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
    <>
      {councilMembersViewTextContent.length
        ? (
          <div className="my-8" aria-label="council members page">
            {/* Section # 1 - Meet the Council Members */}
            <Section>
              <Section.Heading>
                {councilMembersViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <div className="flex flex-wrap gap-6">
                {councilMembers.length
                  ? renderCouncilMemberCards()
                  : null}
              </div>
            </Section>
            {/* Section # 2 - Alumni */}
            <Section>
              <Section.Heading>
                {councilMembersViewTextContent[1].attributes.section_heading}
              </Section.Heading>
              <div className="flex flex-wrap justify-center gap-8 md:justify-evenly md:gap-0">
                {alumniMembers.length
                  ? renderAlumniCards()
                  : null}
              </div>
            </Section>
          </div>
        )
        : null}
    </>
  );
}

const propTypes = {
  councilMembers: PropTypes.array.isRequired,
  alumniMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

CouncilMembers.displayName = "CouncilMembers";
CouncilMembers.propTypes = propTypes;

export default CouncilMembers;
