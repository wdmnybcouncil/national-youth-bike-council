import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import WhyTheCouncil from "./views/WhyTheCouncil";
import CouncilMembers from "./views/CouncilMembers";
import Advisors from "./views/Advisors";

// Import data to pass on to the components
import data from "./constants/data";

/**
 * The main React **App** component.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function App() {
  const { members, whyTheCouncilView, advisorsView } = data;

  // Filter out current Council Members from the list of all the members
  const councilMembers = members.filter((item) => item.roles.includes("Council Member"));

  // Filter out Alumni from the list of all the members
  const alumniMembers = members.filter((item) => item.roles.includes("Alumni"));

  // Filter out Advisors from the list of all the members
  const advisorMembers = members.filter((item) => item.roles.includes("Advisor"));

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="my-10 flex-grow">
        <Routes>
          <Route path="/why-the-council" element={<WhyTheCouncil whyTheCouncilView={whyTheCouncilView} />} />
          <Route path="/council-members" element={<CouncilMembers councilMembers={councilMembers} alumniMembers={alumniMembers} />} />
          <Route path="/advisors" element={<Advisors advisorsView={advisorsView} advisorMembers={advisorMembers} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
