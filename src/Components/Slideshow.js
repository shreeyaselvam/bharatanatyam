import '../App.css';
import Carousel from 'react-bootstrap/Carousel';
import pic1 from '../assets/AbhayaKaram.jpg';
import pic2 from '../assets/CherryBlossomImage.jpg';
import pic3 from '../assets/CherryBlossomPose.jpg';
import pic4 from '../assets/StageImage.jpg';
import Image from 'react-bootstrap/Image';

function Slideshow() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image src={pic1} fluid />;
        <Carousel.Caption className='card-name'>
          <h3>Shreeya's Bharatanatyam</h3>
          <p>ஸ்ரேயாவின் பரதநாட்டிய காட்சி</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={pic2} fluid />;
        <Carousel.Caption className='card-name'>
        <h3>Shreeya's Bharatanatyam</h3>
        <p>ஸ்ரேயாவின் பரதநாட்டிய காட்சி</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={pic3} fluid />;
        <Carousel.Caption className='card-name'>
          <h3>Shreeya's Bharatanatyam</h3>
          <p>
          ஸ்ரேயாவின் பரதநாட்டிய காட்சி
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;
