import React from "react";
import { Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

// Import views
import WhyTheCouncil from "./views/WhyTheCouncil";
import CouncilMembers from "./views/CouncilMembers";
import Advisors from "./views/Advisors";
import BoardMembers from "./views/BoardMembers";
import Sponsorships from "./views/Sponsorships";

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

  const { members, whyTheCouncilView, councilMembersView, advisorsView, boardMembersView, sponsorshipsView } = data;

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

  // ********************************************************************************************* //
  //                       Return different views of the application                               //
  // ********************************************************************************************* //

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Modal {...propsForModal} />
      <main className="my-10 flex-grow">
        <Routes>
          <Route
            path="/*"
            element={(() => (
              <></>
            ))()}
          />
          <Route path="why-the-council" element={<WhyTheCouncil {...propsForWhyTheCouncilView} />} />
          <Route path="council-members" element={<CouncilMembers {...propsForCouncilMembersView} />} />
          <Route path="advisors" element={<Advisors {...propsForAdvisorsView} />} />
          <Route path="board-members" element={<BoardMembers {...propsForBoardMembersView} />} />
          <Route path="sponsorships" element={<Sponsorships {...propsForSponsorshipsView} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
