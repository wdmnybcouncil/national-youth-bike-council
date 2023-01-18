import React from "react";
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import Section from "../components/Section";
import CTALink from "../components/CTALink";
import ProfileCard from "../components/ProfileCard";
import AnimatedHeroTitle from "../components/AnimatedHeroTitle";
import headerImage from "../assets/images/home/nybc-header.png";
import btnArrow from "../assets/images/btn-arrow.svg";
import {
  heroImageAnimationVariants,
  sectionAnimationVariants,
  partnersImagesAnimationVariants,
} from "../utils/animationVariants";
import api from "../utils/api";

/**
 * The **Home** component renders the view for the home route.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Home({ homeViewMembers = [], sponsors = [], onCardClick }) {
  const [homeViewTextContent, setHomeViewTextContent] = React.useState([]);

  // Get the text contents of the page
  React.useEffect(() => {
    api.getHomeViewTextContents()
      .then(({ data }) => setHomeViewTextContent(data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the data from the server.");
        console.log(err);
      });
  }, []);

  const renderImages = (arr) => {
    return arr.map((item) => {
      const { sponsor_logo, sponsor_name } = item.attributes;
      if (!sponsor_logo) {
        if (!sponsor_name) {
          return null;
        }
        return (
          <motion.p
            key={sponsor_name}
            className="bg-skin-fill-accent p-4 text-center text-lg font-semibold tracking-wide text-skin-muted md:text-xl"
            variants={partnersImagesAnimationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {sponsor_name}
          </motion.p>
        );
      }
      const { alternate_text, image_file } = sponsor_logo;
      return <motion.img
        key={alternate_text}
        src={image_file.data.attributes.url}
        alt={alternate_text}
        className="max-h-20 max-w-[250px] object-cover object-center"
        variants={partnersImagesAnimationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} />;
    });
  };

  const renderMemberCards = () =>
    homeViewMembers.map((member) => {
      const { first_name, last_name, profile_image, designation, story_in_brief, story_in_detail } = member.attributes;
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
          <ProfileCard.Text>{story_in_brief}</ProfileCard.Text>
        </ProfileCard>
      );
    });

  return (
    <>
      {homeViewTextContent.length
        ? (
          <div className="my-8" aria-label="home page">
            {/* Section # 1 - Hero */}
            <motion.div
              className="w-full"
              variants={sectionAnimationVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}>
              <div className="mx-auto flex w-full max-w-screen-xl px-8 py-8 md:px-10 md:py-20">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:gap-16">
                  <div className="col-span-2 flex flex-col items-center gap-8 place-self-center sm:items-start">
                    <AnimatedHeroTitle>National Youth Bike Council</AnimatedHeroTitle>
                    <p className="max-w-screen-sm text-center text-skin-base sm:text-left">
                      We are a <span className="font-semibold">youth-led non-profit</span> that creates a space for our peers to feel empowered and have the tools,
                      leadership skills, and youth role models necessary to be leaders in their own community.
                    </p>
                    <CTALink type="internal" linkTo="/join-us">
                      Join us
                      <img src={btnArrow} alt="arrow on button" className="ml-2 inline h-5" />
                    </CTALink>
                  </div>
                  <div className="col-span-2 place-self-center sm:row-auto sm:justify-self-end">
                    <motion.img
                      src={headerImage}
                      alt="hero"
                      className="w-full max-w-screen-sm object-contain object-center"
                      variants={heroImageAnimationVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section # 2 - Mission */}
            <Section>
              <Section.Heading>
                {homeViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
                <div className="col-span-2">
                  {(homeViewTextContent[0].attributes.section_text)
                    ? (<Section.Text>{homeViewTextContent[0].attributes.section_text}</Section.Text>)
                    : null
                  }
                </div>
                <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
                  {(homeViewTextContent[0].attributes.section_image)
                    ? (
                      <Section.Img
                        src={homeViewTextContent[0].attributes.section_image.image_file.data.attributes.url}
                        alt={homeViewTextContent[0].attributes.section_image.alternate_text}
                        className="rounded-md border-4 border-skin-accent object-cover object-center" />
                    )
                    : null
                  }
                </div>
              </div>
            </Section>

            {/* Section # 3 - Supporters */}
            <Section>
              <Section.Heading>
                {homeViewTextContent[1].attributes.section_heading}
              </Section.Heading>
              <div className="col-span-2">
                {(homeViewTextContent[1].attributes.section_text)
                  ? (<Section.Text>{homeViewTextContent[1].attributes.section_text}</Section.Text>)
                  : null
                }
              </div>
              <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">
                {sponsors.length ? renderImages(sponsors) : null}
              </div>
            </Section>

            {/* Section # 4 - Voices */}
            <Section>
              <Section.Heading>
                {homeViewTextContent[2].attributes.section_heading}
              </Section.Heading>
              <div className="flex flex-wrap gap-6">{homeViewMembers.length ? renderMemberCards() : null}</div>
            </Section>
          </div>
        )
        : null}
    </>
  );
}

const propTypes = {
  homeViewMembers: PropTypes.array.isRequired,
  sponsors: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

Home.displayName = "Home";
Home.propTypes = propTypes;

export default Home;
