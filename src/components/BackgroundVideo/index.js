import vid from "../../docs/restaurant-video.mp4";
import "./BackgroundVideo.scss"

function BackgroundVideo() {
  return (
    <video autoPlay muted loop className="video">
      <source src={vid} type="video/mp4" />
    </video>
  );
}

export default BackgroundVideo;
