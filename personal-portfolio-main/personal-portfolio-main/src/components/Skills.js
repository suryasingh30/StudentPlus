import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"
import CubeAnimation from "./cubeAnimation";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <h3 id="hidden-heading">.</h3>
                        <h6 id="hidden-heading">.</h6>
                        <div>
                          <CubeAnimation/>
                        </div>
                        <p>MERN Stack: Proficient in MongoDB, Express.js, React, and Node.js.
                          <br>
                          </br> 
                          Front-end Development: Expertise in HTML, CSS, JavaScript, and front-end frameworks/libraries.
                          <br>
                          </br>
                          Back-end Development: Experienced with server-side technologies, RESTful APIs, and database management.
                          <br></br>
                          DevOps Tools: Familiarity with Docker, Git, and terminal for streamlined development workflows.
                          <br></br>
                          Problem Solving: Strong ability to identify and resolve technical challenges.
                          <br></br>
                          Instruction and Mentorship: Experience in providing instruction and mentorship to individuals, guiding their learning.
                          </p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Web Development</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Image" />
                                <h5>DevOps</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5>Problem Solving</h5>
                            </div>
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Instruction and Mentorship</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
