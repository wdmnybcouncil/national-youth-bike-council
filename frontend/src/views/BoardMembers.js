import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";
import api from "../utils/api";

/**
 * The **BoardMembers** component renders the view that lists all the board members of the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function BoardMembers({ boardMembers = [], onCardClick }) {
  const [boardMembersViewTextContent, setBoardMembersViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getBoardMembersViewTextContents()
      .then(({ data }) => setBoardMembersViewTextContent(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const renderBoardMemberCards = () =>
    boardMembers.map((member) => {
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

  return (
    <>
      {boardMembersViewTextContent.length
        ? (
          <div className="my-8" aria-label="board members page">
            {/* Section # 1 - Meet the Board Members */}
            <Section>
              <Section.Heading>
                {boardMembersViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <div className="flex flex-wrap gap-6">
                {boardMembers.length
                  ? renderBoardMemberCards()
                  : null
                }
              </div>
            </Section>
            {/* Section # 2 - How to Become a Board Member  */}
            <Section>
              <Section.Heading>
                {boardMembersViewTextContent[1].attributes.section_heading}
              </Section.Heading>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
                <div className="col-span-2">
                  {
                    (boardMembersViewTextContent[1].attributes.section_text)
                      ? (<Section.Text>{boardMembersViewTextContent[1].attributes.section_text}</Section.Text>)
                      : null
                  }
                </div>
                <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
                  {
                    (boardMembersViewTextContent[1].attributes.section_image)
                      ? (
                        <Section.Img
                          src={boardMembersViewTextContent[1].attributes.section_image.image_file.data.attributes.url}
                          alt={boardMembersViewTextContent[1].attributes.section_image.alternate_text}
                          className="object-cover object-center" />
                      )
                      : null
                  }
                </div>
              </div>
            </Section>
          </div>
        )
        : null}
    </>
  );
}

const propTypes = {
  boardMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

BoardMembers.displayName = "BoardMembers";
BoardMembers.propTypes = propTypes;

export default BoardMembers;
