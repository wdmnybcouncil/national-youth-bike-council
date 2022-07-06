import React from "react";
import PropTypes from "prop-types";
import { motion } from 'framer-motion';
import Section from "../components/Section";
import CTALink from "../components/CTALink";
import ProfileCard from "../components/ProfileCard";
import headerImage from "../assets/images/home/nybc-header.png";
import btnArrow from "../assets/images/btn-arrow.svg";
import { sectionAnimationVariants } from "../utils/animationVariants";

/**
 * The **Home** component renders the view for the home route.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Home({ homeView, homeViewMembers = [], onCardClick }) {
  const renderSectionTexts = (texts) => texts.map((text, index) => <Section.Text key={`${index}-${text.substring(0, 10)}`}>{text}</Section.Text>);

  const renderImages = (arr) => {
    return arr.map(({ img, text }) => {
      if (img.src === "" || img.src === undefined) {
        if (text === "" || text === undefined) {
          return null;
        }
        return (
          <p key={text} className="bg-skin-fill-accent p-4 text-center text-lg font-semibold tracking-wide text-skin-muted md:text-xl">
            {text}
          </p>
        );
      }
      return <img key={img.alt} src={img.src} alt={img.alt} className="max-h-20 max-w-[250px] object-cover object-center" />;
    });
  };

  const renderMemberCards = () =>
    homeViewMembers.map((member) => {
      const { firstName, lastName, img, story } = member;
      const userProfile = {
        userName: `${firstName} ${lastName.substring(0, 1)}.`,
        userImg: img,
        userStory: story.detail,
      };
      return (
        <ProfileCard key={`${firstName}-${lastName}`} className="xs:min-w-72 mx-auto w-64 lg:w-full" onCardClick={onCardClick} userProfile={userProfile}>
          <ProfileCard.Img src={img} alt={`${firstName} ${lastName}'s profile`} className="object-cover object-center" />
          <ProfileCard.Title>{`${firstName} ${lastName.substring(0, 1)}.`}</ProfileCard.Title>
          <ProfileCard.Subtitle>Council Member</ProfileCard.Subtitle>
          <ProfileCard.Text>{story.brief}</ProfileCard.Text>
        </ProfileCard>
      );
    });

  return (
    <div className="my-8">
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
              <h1 className="w-full max-w-screen-md bg-gradient-to-l from-orange-600 to-skin-accent bg-clip-text text-center font-balgin text-4xl tracking-wider text-transparent drop-shadow sm:text-left lg:text-6xl">
                National Youth Bike Council
              </h1>
              <p className="max-w-screen-sm text-center text-skin-primary sm:text-left">
                We are a <span className="font-semibold">youth-led non-profit</span> that creates a space for our peers to feel empowered and have the tools,
                leadership skills, and youth role models necessary to be leaders in their own community.
              </p>
              <CTALink type="internal" linkTo="/join-us">
                Join us
                <img src={btnArrow} alt="arrow on button" className="ml-2 inline h-5" />
              </CTALink>
            </div>
            <div className="col-span-2 place-self-center sm:row-auto sm:justify-self-end">
              <img src={headerImage} alt="hero" className="w-full max-w-screen-sm object-contain object-center" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section # 2 - Mission */}
      <Section>
        <Section.Heading>{homeView[0].heading}</Section.Heading>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
          <div className="col-span-2 flex flex-col gap-8">{renderSectionTexts(homeView[0].text)}</div>
          <div className="col-span-2 row-start-1 place-self-center sm:row-auto sm:justify-self-end">
            <Section.Img src={homeView[0].img.src} alt={homeView[0].img.alt} className="rounded-md border-4 border-skin-accent object-cover object-center" />
          </div>
        </div>
      </Section>

      {/* Section # 3 - Supporters */}
      <Section>
        <Section.Heading>{homeView[1].heading}</Section.Heading>
        <div className="col-span-2 flex flex-col gap-8">{renderSectionTexts(homeView[1].text)}</div>
        <div className="mt-6 grid grid-cols-1 place-items-center gap-14 sm:grid-cols-2 md:grid-cols-3">
          {homeView[1].sponsorships.length && renderImages(homeView[1].sponsorships)}
        </div>
      </Section>

      {/* Section # 4 - Voices */}
      <Section>
        <Section.Heading>{homeView[2].heading}</Section.Heading>
        <div className="flex flex-wrap gap-6">{homeViewMembers.length && renderMemberCards()}</div>
      </Section>
    </div >
  );
}

const propTypes = {
  homeView: PropTypes.array.isRequired,
  homeViewMembers: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

Home.displayName = "Home";
Home.propTypes = propTypes;

export default Home;
