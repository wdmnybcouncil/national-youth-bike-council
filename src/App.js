import React from "react";
import { Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

// Import views
import HomeView from "./views/HomeView";
import PageNotFoundView from "./views/PageNotFoundView";
import HowItStarted from "./views/HowItStarted";
import WhereAreWe from "./views/WhereAreWe";
import WhyTheCouncil from "./views/WhyTheCouncil";
import CouncilMembers from "./views/CouncilMembers";
import Advisors from "./views/Advisors";
import BoardMembers from "./views/BoardMembers";
import Sponsorships from "./views/Sponsorships";
import ProjectsView from "./views/ProjectsView";
import MediaCoverage from "./views/MediaCoverage";
import CouncilBlogs from "./views/CouncilBlogs";
import ResourcesSafetyView from "./views/ResourcesSafetyView";
import JoinUsView from "./views/JoinUsView";

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
    howItStartedView,
    whereAreWeView,
    whyTheCouncilView,
    councilMembersView,
    advisorsView,
    boardMembersView,
    sponsorshipsView,
    mediaCoverageView,
    councilBlogsView,
    joinUsView,
  } = data;

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

  const propsForHowItStartedView = {
    howItStartedView,
    startingCrewMembers,
    onCardClick: handleProfileCardClick,
  }

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
  }

  const propsForJoinUsView = {
    joinUsView,
  }

  // ********************************************************************************************* //
  //                       Return different views of the application                               //
  // ********************************************************************************************* //


  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Modal {...propsForModal} />
      <main className="my-10 flex-grow">
        <Routes>
          <Route path="*" element={<PageNotFoundView />} />
          <Route path="/" element={<HomeView />} />
          <Route path="how-it-started" element={<HowItStarted {...propsForHowItStartedView} />} />
          <Route path="where-are-we" element={<WhereAreWe {...propsForWhereAreWeView} />} />
          <Route path="why-the-council" element={<WhyTheCouncil {...propsForWhyTheCouncilView} />} />
          <Route path="council-members" element={<CouncilMembers {...propsForCouncilMembersView} />} />
          <Route path="advisors" element={<Advisors {...propsForAdvisorsView} />} />
          <Route path="board-members" element={<BoardMembers {...propsForBoardMembersView} />} />
          <Route path="sponsorships" element={<Sponsorships {...propsForSponsorshipsView} />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="media-coverage" element={<MediaCoverage {...propsForMediaCoverageView} />} />
          <Route path="council-blogs" element={<CouncilBlogs {...propsForCouncilBlogsView} />} />
          <Route path="resources-safety" element={<ResourcesSafetyView />} />
          <Route path="join-us" element={<JoinUsView {...propsForJoinUsView} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
