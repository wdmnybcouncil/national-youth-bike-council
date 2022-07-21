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

import api from "./utils/api";

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
  const [startingCrewMembers, setStartingCrewMembers] = React.useState([]);
  const [councilMembers, setCouncilMembers] = React.useState([]);
  const [alumniMembers, setAlumniMembers] = React.useState([]);
  const [advisorMembers, setAdvisorMembers] = React.useState([]);
  const [boardMembers, setBoardMembers] = React.useState([]);
  const [homeViewMembers, setHomeViewMembers] = React.useState([]);
  const [sponsors, setSponsors] = React.useState([]);
  const [partners, setPartners] = React.useState([]);

  const {
    mediaCoverageView,
    councilBlogsView,
    joinUsView,
    footer,
  } = data;

  // ********************************************************************************************* //
  //                                          API Calls                                            //
  // ********************************************************************************************* //
  React.useEffect(() => {
    api.getFoundingMembers()
      .then(members => setStartingCrewMembers(members.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getCouncilMembers()
      .then(members => setCouncilMembers(members.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getAlumniMembers()
      .then(members => setAlumniMembers(members.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getAdvisorMembers()
      .then(members => setAdvisorMembers(members.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getBoardMembers()
      .then(members => setBoardMembers(members.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getHomeViewMembers()
      .then(members => setHomeViewMembers(members.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getSponsers()
      .then(sponsors => setSponsors(sponsors.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getPartners()
      .then(partners => setPartners(partners.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

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
    homeViewMembers,
    sponsors,
    onCardClick: handleProfileCardClick,
  };

  const propsForHowItStartedView = {
    startingCrewMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForCouncilMembersView = {
    councilMembers,
    alumniMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForAdvisorsView = {
    advisorMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForBoardMembersView = {
    boardMembers,
    onCardClick: handleProfileCardClick,
  };

  const propsForSponsorshipsView = {
    sponsors,
    partners,
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
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home {...propsForHomeView} />} />
            <Route path="how-it-started" element={<HowItStarted {...propsForHowItStartedView} />} />
            <Route path="where-are-we" element={<WhereAreWe />} />
            <Route path="why-the-council" element={<WhyTheCouncil />} />
            <Route path="council-members" element={<CouncilMembers {...propsForCouncilMembersView} />} />
            <Route path="advisors" element={<Advisors {...propsForAdvisorsView} />} />
            <Route path="board-members" element={<BoardMembers {...propsForBoardMembersView} />} />
            <Route path="sponsorships" element={<Sponsorships {...propsForSponsorshipsView} />} />
            <Route path="projects" element={<Projects />} />
            <Route path="media-coverage" element={<MediaCoverage {...propsForMediaCoverageView} />} />
            <Route path="council-blogs" element={<CouncilBlogs {...propsForCouncilBlogsView} />} />
            <Route path="resources-safety" element={<ResourcesSafety />} />
            <Route path="join-us" element={<JoinUs {...propsForJoinUsView} />} />
          </Routes>
        </main>
        <Footer {...propsForFooter} />
      </div>
    </HelmetProvider>
  );
}

export default App;
