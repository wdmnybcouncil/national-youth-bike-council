import React from "react";
import PropTypes from "prop-types";
import Section from "../components/Section";
import ProfileCard from "../components/ProfileCard";
import CTALink from "../components/CTALink";
import btnArrow from "../assets/images/btn-arrow.svg";
import api from "../utils/api";

/**
 * The **Advisors** component renders the view that tells about the role of advisors in the council.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Advisors({ advisorMembers = [], onCardClick }) {
  const [advisorsViewTextContent, setAdvisorsViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getAdvisorsViewTextContents()
      .then(({ data }) => setAdvisorsViewTextContent(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);


  const renderAdvisorMemberCards = () =>
    advisorMembers.map((member) => {
      const { first_name, last_name, profile_image, roles, location, story_in_detail } = member.attributes;
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
          <ProfileCard.Subtitle>{roles[0]}</ProfileCard.Subtitle>
          <ProfileCard.Location>{location}</ProfileCard.Location>
        </ProfileCard>
      );
    });

  return (
    <>
      {advisorsViewTextContent.length
        ? (
          <div className="my-8" aria-label="advisor page">
            {/* Section # 1 - Who are Advisors? */}
            <Section>
              <Section.Heading>
                {advisorsViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
                <div className="col-span-2">
                  {(advisorsViewTextContent[0].attributes.section_text)
                    ? (<Section.Text>{advisorsViewTextContent[0].attributes.section_text}</Section.Text>)
                    : null
                  }
                </div>
                <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
                  {(advisorsViewTextContent[0].attributes.section_image)
                    ? (
                      <Section.Img
                        src={advisorsViewTextContent[0].attributes.section_image.image_file.data.attributes.url}
                        alt={advisorsViewTextContent[0].attributes.section_image.alternate_text}
                        className="object-cover object-center" />
                    )
                    : null
                  }
                </div>
              </div>
            </Section>
            {/* Section # 2 - Meet the Advisors */}
            <Section>
              <Section.Heading>
                {advisorsViewTextContent[1].attributes.section_heading}
              </Section.Heading>
              <div className="flex flex-wrap gap-6">
                {advisorMembers.length
                  ? renderAdvisorMemberCards()
                  : null
                }
              </div>
            </Section>
            {/* Section # 3 - How to Become an Advisor  */}
            <Section>
              <Section.Heading>
                {advisorsViewTextContent[2].attributes.section_heading}
              </Section.Heading>
              <div className="flex flex-col">
                {(advisorsViewTextContent[2].attributes.section_text)
                  ? (<Section.Text>{advisorsViewTextContent[2].attributes.section_text}</Section.Text>)
                  : null
                }
                <CTALink type="internal" linkTo="/join-us" className="mt-4 self-center xs:self-start">
                  Join us
                  <img src={btnArrow} alt="arrow on button" className="ml-2 inline h-5" />
                </CTALink>
              </div>
            </Section>
          </div>
        )
        : null}
    </>
  );
}

const propTypes = {
  advisorMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

Advisors.displayName = "Advisors";
Advisors.propTypes = propTypes;

export default Advisors;
