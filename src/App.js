import React from "react";
import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";

import WhyTheCouncil from "./views/WhyTheCouncil";

// Import data to pass on to the components
import data from "./constants/data";

/**
 * The main React **App** component.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function App() {
  const {
    whyTheCouncil,
  } = data;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/why-the-council" element={<WhyTheCouncil data={whyTheCouncil} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
