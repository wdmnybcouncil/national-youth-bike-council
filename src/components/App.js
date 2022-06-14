import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow">
        Main
      </main>
      <Footer />
    </div>
  );
}

export default App;
