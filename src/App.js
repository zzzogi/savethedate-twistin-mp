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
import SaveTheDate from "./components/SaveTheDate/SaveTheDate";
import Timeline from "./components/Timeline/Timeline";
import FloatingButtons from "./components/FloatingButton/FloatingButtons";
import MV from "./components/MV/MV";
import Testimonial from "./components/Testimonial/Testimonial";

function App() {
  return (
    <div className="App">
      <Hero />
      <SaveTheDate />
      <WeddingInfo />
      <Timeline />
      <CoupleIntro />
      <OurStory />
      <MV />
      <Gallery />
      <RSVP />
      <Testimonial />
      <Countdown />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
