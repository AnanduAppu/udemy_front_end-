
// import Slider from 'react-slick';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayCourses from './DisplayCourses';
import image1 from '../assets/carouselimg1.jpg'
import image2 from '../assets/carouselimg2.jpg'
import image3 from '../assets/carouselimg3.jpeg'
import Bottompage from './Bottompage';


function Homepage() {




  return (
  
       <>
{/* ............................carousel area..................... */}
<Carousel className='my-4'>
      <Carousel.Item>
      <img src={image1} alt="a image" className="mx-auto border border-black"/>
        <Carousel.Caption>
        <div className="carousel-caption text-white position-absolute bottom-40 start-0 py-10 w-96 text-start font-bold  bg-black bg-opacity-70 border-2 rounded-lg">
          <h3 className='mx-2'>level up your skills, make better future </h3>
          <p className='mx-2'>Sneak the New Thoughts</p>
          <button type="button" className='btn btn-primary m-2'>Explore Now</button>
        </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image2} alt="a image" className="mx-auto"/>
        <Carousel.Caption>
        <div className="carousel-caption text-white position-absolute bottom-40 start-0 py-10 w-96 text-start font-bold  bg-black bg-opacity-70 border rounded-lg">
          <h3 className='mx-2'>level up your skills, make better future </h3>
          <p className='mx-2'>Sneak the New Thoughts</p>
          <button type="button" className='btn btn-primary m-2'>Explore Now</button>
        </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={image3} alt="a image" className="mx-auto" />
        <Carousel.Caption>
        <div className="carousel-caption text-white position-absolute bottom-40 start-0 py-10 w-96 text-start font-bold  bg-black bg-opacity-70 border rounded-lg">
          <h3 className='mx-2'>level up your skills, make better future </h3>
          <p className='mx-2'>Sneak the New Thoughts</p>
          <button type="button" className='btn btn-primary m-2'>Explore Now</button>
        </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
{/* ............................carousel area..................... */}


{/* companies which trusted us */}

<div className="w-100 bg-white h-52 pt-2">
  <p className=' text-center font-semibold '>trusted by over 15,000 companies and millions of learners around the world</p>
  <ul className="flex justify-around items-center mx-4 h-full ">
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/volkswagen.svg" alt="" /></li>
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/samsung.svg" alt="" /></li>
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/cisco.svg" alt="" /></li>
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/att.svg" alt="" /></li>
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/procter_gamble.svg" alt="" /></li>
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/hewlett_packard_enterprise.svg" alt="" /></li>
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/citi.svg" alt="" /></li>
    <li><img src="https://s.udemycdn.com/partner-logos/ou-v1/ericsson.svg" alt="" /></li>
  </ul>
</div>
{/* companies which trusted us */}

{/* courses which we providing */}
<DisplayCourses/>



<Bottompage/>
</>
        

  
  )
}

export default Homepage