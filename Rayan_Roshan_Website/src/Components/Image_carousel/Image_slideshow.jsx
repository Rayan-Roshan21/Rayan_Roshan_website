import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Image_carousel/Image_slideshow.css"
import Slider from "react-slick";
import image1 from '../../assets/Picture1.jpg';
import image2 from '../../assets/Picture2.jpg';
import image3 from '../../assets/Picture3.jpg';

const images = [image1, image2, image3];
function Image_slideshow() {
  return (
    <div className="box">
      <Carousel 
        useKeyboardArrows={true} 
        autoPlay={true}         // Enables auto-play
        interval={3000}         // 3000ms = 3 seconds between slides
        infiniteLoop={true}     // Loop back to the start
        showThumbs={false}      // Optional: hides image thumbnails
        stopOnHover={true}      // Optional: pause auto-play on hover
        >
        {images.map((URL, index) => (
            <div className="slide" key={index}>
            <img alt="sample_file" src={URL} />
            </div>
        ))}
    </Carousel>
    </div>
  );
}
export default Image_slideshow;
