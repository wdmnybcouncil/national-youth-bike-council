import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";

/**
 * The **HowItStarted** component renders the view that tells how the council was started.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function HowItStarted({ howItStartedView, startingCrewMembers = [], onCardClick }) {
  const renderSectionTexts = (texts) => texts.map((text, index) => <Section.Text key={`${index}-${text.substring(0, 10)}`}>{text}</Section.Text>);

  const renderMembersCards = () =>
    startingCrewMembers.map((member) => {
      const { firstName, lastName, img, roles, story } = member;
      const userProfile = {
        userName: `${firstName} ${lastName.substring(0, 1)}.`,
        userImg: img,
        userStory: story.detail,
      };
      return (
        <ProfileCard key={`${firstName}-${lastName}`} className="xs:min-w-72 mx-auto w-64 lg:w-full" onCardClick={onCardClick} userProfile={userProfile}>
          <ProfileCard.Img src={img} alt={`${firstName} ${lastName}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${firstName} ${lastName}`}</ProfileCard.Title>
        </ProfileCard>
      );
    });

  return (
    <div className="my-8">
      {/* Section # 1 - How It Started */}
      <Section>
        <Section.Heading>{howItStartedView[0].heading}</Section.Heading>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
          <div className="col-span-2 flex flex-col gap-8">{renderSectionTexts(howItStartedView[0].text)}</div>
          <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
            <Section.Img
              src={howItStartedView[0].img.src}
              alt={howItStartedView[0].img.alt}
              className="rounded-md border-4 border-skin-accent object-cover object-center"
            />
          </div>
        </div>
      </Section>
      {/* Section # 2 - Meet the Advisors */}
      <Section>
        <Section.Heading>{howItStartedView[1].heading}</Section.Heading>
        <div className="flex flex-wrap gap-6">{howItStartedView.length && renderMembersCards()}</div>
      </Section>
    </div>
  );
}

const propTypes = {
  howItStartedView: PropTypes.array.isRequired,
  startingCrewMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

HowItStarted.displayName = "HowItStarted";
HowItStarted.propTypes = propTypes;

export default HowItStarted;
