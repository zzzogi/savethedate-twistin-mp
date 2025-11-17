import MusicPlayer from "../MusicPlayer/MusicPlayer";
import BackToTop from "../BackToTop/BackToTop";
import "./FloatingButtons.css";

const FloatingButtons = () => {
  return (
    <div className="floating-buttons-container">
      <BackToTop />
      <MusicPlayer />
    </div>
  );
};

export default FloatingButtons;
