import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Section from '../components/Section';
import ProfileCard from '../components/ProfileCard';
import api from '../utils/api';

/**
 * The **YbsSteeringCommittee** component renders the view that tells about Youth Bike Summit Steering Committee.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function YbsSteeringCommittee({ onCardClick }) {
  const [steeringCommitteeViewTextContent, setSteeringCommitteeViewTextContent] = useState([]);
  const [steeringCommitteeMembers, setSteeringCommitteeMembers] = useState([]);

  // Get the text contents of the page
  useEffect(() => {
    api
      .getSteeringCommitteeViewTextContents()
      .then(({ data }) => setSteeringCommitteeViewTextContent(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });

    // Get the members of the committe
    api
      .getSteeringCommitteeMembers()
      .then(({ data }) => setSteeringCommitteeMembers(data))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while fetching the data from the server.');
        console.log(err);
      });
  }, []);

  const renderSteeringCommitteeMemberCards = () =>
    steeringCommitteeMembers.map(({ attributes }) => {
      const { first_name, last_name, profile_image, designation, location, story_in_detail } = attributes;
      const img = profile_image.data.attributes.url;
      const userProfile = {
        userName: `${first_name} ${last_name}`,
        userImg: img,
        userStory: story_in_detail,
      };
      return (
        <ProfileCard key={`${first_name}-${last_name}`} className="xs:min-w-72 mx-auto w-64 lg:w-full" onCardClick={onCardClick} userProfile={userProfile}>
          <ProfileCard.Img src={img} alt={`${first_name} ${last_name}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${first_name} ${last_name}`}</ProfileCard.Title>
          <ProfileCard.Subtitle>{designation}</ProfileCard.Subtitle>
          <ProfileCard.Location>{location}</ProfileCard.Location>
        </ProfileCard>
      );
    });

  return (
    <>
      {steeringCommitteeViewTextContent.length ? (
        <div className="my-8" aria-label="advisor page">
          {/* Section # 1 - Youth Bike Summit Steering Committee */}
          <Section>
            <Section.Heading>{steeringCommitteeViewTextContent[0].attributes.section_heading}</Section.Heading>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
              <div className="col-span-2">
                {steeringCommitteeViewTextContent[0].attributes.section_text ? (
                  <Section.Text>{steeringCommitteeViewTextContent[0].attributes.section_text}</Section.Text>
                ) : null}
              </div>
              <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
                {steeringCommitteeViewTextContent[0].attributes.section_image ? (
                  <Section.Img
                    src={steeringCommitteeViewTextContent[0].attributes.section_image.image_file.data.attributes.url}
                    alt={steeringCommitteeViewTextContent[0].attributes.section_image.alternate_text}
                    className="object-cover object-center"
                  />
                ) : null}
              </div>
            </div>
          </Section>
          {/* Section # 2 - Meet the Members */}
          <Section>
            <Section.Heading>{steeringCommitteeViewTextContent[1].attributes.section_heading}</Section.Heading>
            <div className="flex flex-wrap gap-6">{steeringCommitteeMembers.length ? renderSteeringCommitteeMemberCards() : null}</div>
          </Section>
        </div>
      ) : null}
    </>
  );
}

const propTypes = {
  onCardClick: PropTypes.func.isRequired,
};

YbsSteeringCommittee.displayName = 'YbsSteeringCommittee';
YbsSteeringCommittee.propTypes = propTypes;

export default YbsSteeringCommittee;
