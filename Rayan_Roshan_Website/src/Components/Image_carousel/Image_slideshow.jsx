import { Carousel } from "react-responsive-carousel";
import { useReducedMotion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Image_slideshow.css";
import Img from "@/Components/Img/Img.jsx";

const slides = [
  { name: "Picture2", alt: "Rayan presenting at a student tech event" },
  { name: "Picture3", alt: "Rayan working with a project team" },
  { name: "DSC_1262", alt: "Rayan at a hackathon" },
];

function Image_slideshow() {
  const reduced = useReducedMotion();

  return (
    <div className="box">
      <Carousel
        useKeyboardArrows
        showThumbs={false}
        infiniteLoop
        stopOnHover
        /* Swipeable on pointer devices too, so the carousel can be
           dragged rather than only stepped through by its arrows —
           tracking the pointer beats a control that only reports a
           final state. */
        swipeable
        emulateTouch
        preventMovementUntilSwipeScrollTolerance
        swipeScrollTolerance={10}   /* hysteresis before committing to a direction */
        /* A 3s auto-advance is a ~0.33Hz loop running for as long as
           the page is open. Held for users who accept motion; stopped
           entirely for users who do not. */
        autoPlay={!reduced}
        interval={5000}
        transitionTime={reduced ? 0 : 400}
      >
        {slides.map(({ name, alt }) => (
          <div className="slide" key={name}>
            <Img name={name} alt={alt} sizes="(max-width: 900px) 100vw, 460px" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Image_slideshow;
