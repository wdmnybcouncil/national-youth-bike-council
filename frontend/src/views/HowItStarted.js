import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";
import api from "../utils/api";

/**
 * The **HowItStarted** component renders the view that tells how the council was started.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function HowItStarted({ startingCrewMembers = [], onCardClick }) {
  const [howItStartedViewTextContent, setHowItStartedViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getHowItStartedViewTextContents()
      .then(response => setHowItStartedViewTextContent(response.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const renderMembersCards = () =>
    startingCrewMembers.map((member) => {
      const { first_name, last_name, profile_image, story_in_detail } = member.attributes;
      const img = profile_image.data.attributes.url;
      const userProfile = {
        userName: `${first_name} ${last_name.substring(0, 1)}.`,
        userImg: img,
        userStory: story_in_detail,
      };
      return (
        <ProfileCard key={`${first_name}-${last_name}`} className="xs:min-w-72 mx-auto w-64 lg:w-full" onCardClick={onCardClick} userProfile={userProfile}>
          <ProfileCard.Img src={img} alt={`${first_name} ${last_name}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${first_name} ${last_name}`}</ProfileCard.Title>
        </ProfileCard>
      );
    });

  return (
    <>
      {howItStartedViewTextContent.length
        ? (
          <div className="my-8" aria-label="how it started page">
            {/* Section # 1 - How It Started */}
            <Section>
              <Section.Heading>
                {howItStartedViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
                <div className="col-span-2">
                  <Section.Text>{howItStartedViewTextContent[0].attributes.section_text}</Section.Text>
                </div>
                <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
                  <Section.Img
                    src={howItStartedViewTextContent[0].attributes.section_image.image_file.data.attributes.url}
                    alt={howItStartedViewTextContent[0].attributes.section_image.alternate_text}
                    className="rounded-md border-4 border-skin-accent object-cover object-center"
                  />
                </div>
              </div>
            </Section>
            {/* Section # 2 - Meet the Advisors */}
            <Section>
              <Section.Heading>
                {howItStartedViewTextContent[1].attributes.section_heading}
              </Section.Heading>
              <div className="flex flex-wrap gap-6">
                {howItStartedViewTextContent.length ? renderMembersCards() : null}
              </div>
            </Section>
          </div>
        )
        : null}
    </>
  );
}

const propTypes = {
  startingCrewMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

HowItStarted.displayName = "HowItStarted";
HowItStarted.propTypes = propTypes;

export default HowItStarted;
