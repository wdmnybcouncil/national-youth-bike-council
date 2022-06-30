import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";

/**
 * The **BoardMembers** component renders the view that lists all the board members of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function BoardMembers({ boardMembersView, boardMembers = [], onCardClick }) {
  const renderSectionTexts = (texts) => texts.map((text, index) => <Section.Text key={`${index}-${text.substring(0, 10)}`}>{text}</Section.Text>);
  const renderBoardMemberCards = () =>
    boardMembers.map((member) => {
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

  return (
    <div className="my-8">
      {/* Section # 1 - Meet the Board Members */}
      <Section>
        <Section.Heading>{boardMembersView[0].heading}</Section.Heading>
        <div className="flex flex-wrap gap-6">{boardMembers.length && renderBoardMemberCards()}</div>
      </Section>
      {/* Section # 2 - How to Become a Board Member  */}
      <Section>
        <Section.Heading>{boardMembersView[1].heading}</Section.Heading>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
          <div className="col-span-2 flex flex-col gap-8">{renderSectionTexts(boardMembersView[1].text)}</div>
          <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
            <Section.Img src={boardMembersView[1].img.src} alt={boardMembersView[1].img.alt} className="object-cover object-center" />
          </div>
        </div>
      </Section>
    </div>
  );
}

const propTypes = {
  boardMembersView: PropTypes.array.isRequired,
  boardMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

BoardMembers.displayName = "BoardMembers";
BoardMembers.propTypes = propTypes;

export default BoardMembers;
