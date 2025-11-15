import React from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import WeddingInfo from "./components/WeddingInfo/WeddingInfo";
import CoupleIntro from "./components/CoupleIntro/CoupleIntro";
import OurStory from "./components/OurStory/OurStory";
import Gallery from "./components/Gallery/Gallery";
import RSVP from "./components/RSVP/RSVP";
import Countdown from "./components/Countdown/Countdown";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Hero />
      <WeddingInfo />
      <CoupleIntro />
      <OurStory />
      <Gallery />
      <RSVP />
      <Countdown />
      <Footer />
    </div>
  );
}

export default App;
