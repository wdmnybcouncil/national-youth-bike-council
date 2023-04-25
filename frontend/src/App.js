import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from 'react-helmet-async';

// Import components
import Modal from "./components/Modal";
import Layout from "./components/Layout";

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
import Project from "./views/Project";
import MediaCoverage from "./views/MediaCoverage";
import CouncilBlogs from "./views/CouncilBlogs";
import CouncilBlog from "./views/CouncilBlog";
import ResourcesSafety from "./views/ResourcesSafety";
import JoinUs from "./views/JoinUs";
import LiabilityTerms from "./views/LiabilityTerms";
import Homeroom from "./views/Homeroom";
import ImpactReports from "./views/ImpactReports";
import YbsSteeringCommittee from "./views/YbsSteeringCommittee";

import api from "./utils/api";

/**
 * The main React **App** component.
 *
 * @version 1.1.0
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

  // ********************************************************************************************* //
  //                                          API Calls                                            //
  // ********************************************************************************************* //
  React.useEffect(() => {
    api.getAllMembers()
      .then(({ data }) => {
        setStartingCrewMembers(data.filter(member => member.attributes.roles.includes('Co-Founder')));
        setCouncilMembers(data.filter(member => member.attributes.roles.includes('Council Member')));
        setAlumniMembers(data.filter(member => member.attributes.roles.includes('Alumni')));
        setAdvisorMembers(data.filter(member => member.attributes.roles.includes('Advisor')));
        setBoardMembers(data.filter(member => member.attributes.roles.includes('Board Member')));
        setHomeViewMembers(data.filter(member =>
          member.attributes.first_name === 'Zoe'
          || member.attributes.first_name === 'Lot'
          || member.attributes.first_name === 'Luly'));
      })
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

  const propsForYbsSteeringCommitteeView = {
    onCardClick: handleProfileCardClick,
  }

  // ********************************************************************************************* //
  //                       Return different views of the application                               //
  // ********************************************************************************************* //

  return (
    <HelmetProvider>
      <div className="flex h-screen flex-col">
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isModalOpen && <Modal {...propsForModal} />}
        </AnimatePresence>
        <Routes>
          <Route element={<Layout />}>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home {...propsForHomeView} />} />
            <Route path="how-it-started" element={<HowItStarted {...propsForHowItStartedView} />} />
            <Route path="where-are-we" element={<WhereAreWe />} />
            <Route path="why-the-council" element={<WhyTheCouncil />} />
            <Route path="council-members" element={<CouncilMembers {...propsForCouncilMembersView} />} />
            <Route path="advisors" element={<Advisors {...propsForAdvisorsView} />} />
            <Route path="board-members" element={<BoardMembers {...propsForBoardMembersView} />} />
            <Route path="ybs-steering-committee" element={<YbsSteeringCommittee {...propsForYbsSteeringCommitteeView} />} />
            <Route path="sponsorships" element={<Sponsorships {...propsForSponsorshipsView} />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectTitle" element={<Project />} />
            <Route path="media-coverage" element={<MediaCoverage />} />
            <Route path="council-blogs" element={<CouncilBlogs />} />
            <Route path="council-blogs/:blogTitle" element={<CouncilBlog />} />
            <Route path="resources-safety" element={<ResourcesSafety />} />
            <Route path="homeroom" element={<Homeroom />} />
            <Route path="impact-reports" element={<ImpactReports />} />
            <Route path="join-us" element={<JoinUs />} />
            <Route path="join-the-council" element={<JoinUs />} />
            <Route path="waiver-liability-terms" element={<LiabilityTerms />} />
          </Route>
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
