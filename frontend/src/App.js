import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

// Import views
import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import HowItStarted from "./views/HowItStarted";
import WhereAreWe from "./views/WhereAreWe";
import WhyTheCouncil from "./views/WhyTheCouncil";
import CouncilMembers from "./views/CouncilMembers";
import Advisors from "./views/Advisors";
import BoardMembers from "./views/BoardMembers";
import Sponsorships from "./views/Sponsorships";
import Projects from "./views/Projects";
import MediaCoverage from "./views/MediaCoverage";
import CouncilBlogs from "./views/CouncilBlogs";
import ResourcesSafety from "./views/ResourcesSafety";
import JoinUs from "./views/JoinUs";

// Import data to pass on to the components
import data from "./constants/data";

/**
 * The main React **App** component.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function App() {
  // Component States
  const [selectedUserProfile, setSelectedUserProfile] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    members,
    homeView,
    howItStartedView,
    whereAreWeView,
    whyTheCouncilView,
    councilMembersView,
    advisorsView,
    boardMembersView,
    sponsorshipsView,
    mediaCoverageView,
    councilBlogsView,
    resourcesSafetyView,
    joinUsView,
    footer,
  } = data;

  // Filter out all the members to be shown on the home page
  const homeViewMembers = ["Zoe", "Lot", "Luly"].map((memberName) => members.filter((item) => item.firstName === memberName)[0]);

  // Filter out all the members of the starting crew from the list of all the members
  const startingCrewMembers = members.filter((item) => item.roles.includes("Co-Founder"));

  // Filter out current Council Members from the list of all the members
  const councilMembers = members.filter((item) => item.roles.includes("Council Member"));

  // Filter out Alumni from the list of all the members
  const alumniMembers = members.filter((item) => item.roles.includes("Alumni"));

  // Filter out Advisors from the list of all the members
  const advisorMembers = members.filter((item) => item.roles.includes("Advisor"));

  // Filter out Board Members from the list of all the members
  const boardMembers = members.filter((item) => item.roles.includes("Board Member"));

  // ********************************************************************************************* //
  //                 Handle mouse click or Esc key down event on Modal                             //
  // ********************************************************************************************* //
  React.useEffect(() => {
    const handleClickClose = (e) => {
      if (e.target.classList.contains("modal_opened")) {
        handleModalClose();
      }
    };

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener("click", handleClickClose);
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("click", handleClickClose);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isModalOpen]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUserProfile({});
  };

  // ********************************************************************************************* //
  //                              Handle all the events on the web page                            //
  // ********************************************************************************************* //

  const handleProfileCardClick = (userProfileData) => {
    setSelectedUserProfile(userProfileData);
    setIsModalOpen(true);
  };

  // ********************************************************************************************* //
  //                 Create props objects to pass to the React Components                          //
  // ********************************************************************************************* //
  const propsForModal = {
    isOpen: isModalOpen,
    onClose: handleModalClose,
    userProfile: selectedUserProfile,
  };

  const propsForHomeView = {
    homeView,
    homeViewMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForHowItStartedView = {
    howItStartedView,
    startingCrewMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForWhereAreWeView = {
    whereAreWeView,
  };

  const propsForWhyTheCouncilView = {
    whyTheCouncilView,
  };

  const propsForCouncilMembersView = {
    councilMembersView,
    councilMembers,
    alumniMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForAdvisorsView = {
    advisorsView,
    advisorMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForBoardMembersView = {
    boardMembersView,
    boardMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForSponsorshipsView = {
    sponsorshipsView,
  };

  const propsForMediaCoverageView = {
    mediaCoverageView,
  };

  const propsForCouncilBlogsView = {
    councilBlogsView,
  };

  const propsForJoinUsView = {
    joinUsView,
  };

  const propsForResourcesSafetyView = {
    resourcesSafetyView,
  };

  const propsForFooter = {
    footer,
  };

  // ********************************************************************************************* //
  //                       Return different views of the application                               //
  // ********************************************************************************************* //

  return (
    <HelmetProvider>
      <div className="flex h-screen flex-col">
        <Helmet>
          <meta charSet="utf-8" />
          <title>National Youth Bike Council | Community for youth empowerment</title>
          <meta name="description" content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community." />
          <meta name="keywords" content="national youth bike council, youth, bike, bicycle, leadership, learning, joshua funches, joshua" />
          <meta name="author" content="Shraddha | https://github.com/5hraddha" />
          {/* Google / Search Engine Tags */}
          <meta itemprop="name" content="National Youth Bike Council | Community for youth empowerment" />
          <meta
            itemprop="description"
            content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community."
          />
          <meta
            itemprop="image"
            content="https://raw.githubusercontent.com/5hraddha/national-youth-bike-council/main/src/assets/images/nybc-seo-image.png"
          />
          {/* Twitter card meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://raw.githubusercontent.com/5hraddha/national-youth-bike-council/main/src/assets/images/nybc-seo-image.png" />
          <meta name="twitter:title" content="National Youth Bike Council | Community for youth empowerment" />
          <meta name="twitter:creator" content="@senorTeNecesito" />
          <meta name="twitter:site" content="@National_ybc" />
          <meta
            name="twitter:description"
            content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community."
          />
          {/* Facebook card meta tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="www.nybcouncil.com" />
          <meta property="og:title" content="National Youth Bike Council | Community for youth empowerment" />
          <meta property="og:description" content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community." />
          <meta property="og:image" content="https://raw.githubusercontent.com/5hraddha/national-youth-bike-council/main/src/assets/images/nybc-seo-image.png" />
        </Helmet>
        <Header />
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isModalOpen && <Modal {...propsForModal} />}
        </AnimatePresence>
        <main className="flex-grow">
          <p>Test</p>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home {...propsForHomeView} />} />
            <Route path="how-it-started" element={<HowItStarted {...propsForHowItStartedView} />} />
            <Route path="where-are-we" element={<WhereAreWe {...propsForWhereAreWeView} />} />
            <Route path="why-the-council" element={<WhyTheCouncil {...propsForWhyTheCouncilView} />} />
            <Route path="council-members" element={<CouncilMembers {...propsForCouncilMembersView} />} />
            <Route path="advisors" element={<Advisors {...propsForAdvisorsView} />} />
            <Route path="board-members" element={<BoardMembers {...propsForBoardMembersView} />} />
            <Route path="sponsorships" element={<Sponsorships {...propsForSponsorshipsView} />} />
            <Route path="projects" element={<Projects />} />
            <Route path="media-coverage" element={<MediaCoverage {...propsForMediaCoverageView} />} />
            <Route path="council-blogs" element={<CouncilBlogs {...propsForCouncilBlogsView} />} />
            <Route path="resources-safety" element={<ResourcesSafety {...propsForResourcesSafetyView} />} />
            <Route path="join-us" element={<JoinUs {...propsForJoinUsView} />} />
          </Routes>
        </main>
        <Footer {...propsForFooter} />
      </div>
    </HelmetProvider>
  );
}

export default App;
