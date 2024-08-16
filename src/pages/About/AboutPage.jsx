import React from 'react';
import './AboutPage.css';
import heroImage from '../../assets/heroabout.png';
import sandDredgingImage from '../../assets/rect41.png';
import missionImage from '../../assets/logo.svg';
import safetyImage1 from '../../assets/rect40.svg';
// import managementImage1 from '../../assets/rect28.png';
// import managementImage2 from '../../assets/rect37.png';
import managementImage3 from '../../assets/Rectangle 47.png';
import TextFade from "../../components/CustomTexts/TextFade";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div
        className="hero-bg1"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content1">
          <h1 className="hero-title">About Us</h1>
        </div>
      </div>

      <div className="flex px-[5%] md:flex-row flex-col justify-between items-center md:mt-0 mt-20 md:gap-0 gap-20">
        <div className="relative md:w-[35%] w-full">
          <img
            src={sandDredgingImage}
            alt="About Us"
            className="w-full md:absolute block top-[-40vh]"
          />
        </div>
        <div className="md:w-[55%] w-full md:mt-32">
          <TextFade animation="fade-down">
            <h1 className="md:text-[60px] text-[30px] font-bold text-dark mb-20">
              Who we are{" "}
            </h1>
          </TextFade>
          <p className="text-dark md:text-[20px] text-[14px] w-full">
          Founded in 2019 by visionary entrepreneur Alhaji Kolawola Olaiya, Stone Rockers Nigeria Limited has experienced remarkable growth in just five years. We began as a single sand dredging operation in Aba, Abia State. Alhaji Olaiya's unwavering commitment to excellence and innovation fueled our expansion, transforming Stone Rockers into a leading construction conglomerate within Nigeria.
          </p>
          <p className="text-dark md:text-[20px] text-[14px] w-full mt-10">
          Our journey is marked by milestones and achievements. Initially, we focused solely on sand dredging in Aba. Recognizing the need for a diversified portfolio, we ventured into the real estate sector, successfully constructing and selling over 20 structures.
          </p>
        </div>
      </div>

      <div className="flex md:mt-[150px] mt-20 flex-col w-full px-[5%] pb-32">
        <TextFade animation="fade-down">
          <h1 className="md:text-[60px] text-[30px] font-bold text-dark mb-10">
          What we've done{" "}
          </h1>
        </TextFade>
        <p className="text-dark md:text-[20px] text-[14px] w-full">
        This year, we're proud to announce the establishment of our new quarry in Kuje, Abuja. Equipped with a world-class Quarry Management System (QMS), this facility is designed to modify access to our core materials for our valued customers. The QMS streamlines the process, making it easier and more efficient than ever before to obtain the high-quality stone products you need.
        </p>
        <p className="text-dark md:text-[20px] text-[14px] w-full mt-10">
        Our company has served clients for years. In that time, we have found that the key to every project’s success is understanding the owner’s needs and expectations and then exceeding those expectations. We believe in building strong partnerships with our clients. Our team of experienced professionals is committed to understanding your unique needs and exceeding your expectations. We're passionate about contributing to Nigeria's infrastructure development and economic growth and have done so ever since our incorporation.
        </p>
      </div>

      <div className="bg-dark px-[5%] py-32">
        <div className="">
          <TextFade animation="fade-down">
            <h1 className="md:text-[60px] text-[30px] font-bold text-light mb-10">
              MISSION STATEMENT{" "}
            </h1>
          </TextFade>
          <p className="text-light md:text-[20px] text-[14px] w-full">
            Innovation in Construction, Excellence in Service
          </p>
          <p className="text-light md:text-[20px] text-[14px] w-full mt-10">
            We aim to redefine the construction and real estate sectors in
            Nigeria by delivering high-quality materials and services that
            uphold our core values of integrity, and innovation. Stone Rockers
            Group is dedicated to setting new standards of excellence in every
            aspect of our work, including maintaining safe working standards.
          </p>
        </div>

        <div className="mt-32 flex md:flex-row flex-col justify-between items-center gap-20">
          <div className="md:w-[35%] w-full">
            <img
              src={missionImage}
              alt="Mission"
              className="mission-image w-full"
            />
          </div>

          <div className="md:w-[55%] w-full">
            {" "}
            <TextFade animation="fade-down">
              <h1 className="md:text-[60px] text-[30px] font-bold text-light mb-10">
                VISION STATEMENT{" "}
              </h1>
            </TextFade>
            <div className="sub1">
              <p className="text-light md:text-[20px] text-[14px] w-full">
                Leading the Way in Sustainable and Quality Development
              </p>
            </div>
            <p className="text-light md:text-[20px] text-[14px] w-full mt-10">
              To become the national leader in providing innovative and
              sustainable construction materials and services, setting the
              standard for quality and excellence in the industry
            </p>
          </div>
        </div>
      </div>

      <div className="our-history">
        <h3 className="history-title">Our Values</h3>
        <div className="flex items-center justify-center mb-20 px-[5%] mt-20">
          <div className="flex flex-col items-center justify-center md:w-[460px] w-[100%]">
            {" "}
            <div className="text-[25px] font-extrabold md:text-[31px] text-light">
            </div>
            <div className="text-[40px] font-extrabold md:text-[80px] text-light leading-[80px] justify-center">
            Unique Structures

            </div>
            <p className="text-light md:text-[20px] text-[14px] w-full text-center">
              {" "}
              Designing and developing one-of-a-kind designs specific to your vision.
            </p>
          </div>
        </div>
        <div className=" w-full flex md:flex-row flex-col justify-between px-[5%] items-start md:gap-0 gap-20">
          <div className="flex flex-col items-center justify-center md:w-[460px] w-[100%]">
            <h6 className="text-[25px] font-extrabold md:text-[31px] text-light">
            </h6>
            <div className="text-[40px] font-extrabold md:text-[80px] text-light leading-[80px]">
            Dedicated Service

            </div>
            <p className="text-light md:text-[20px] text-[14px] w-full text-center">
            Committed to delivering exceptional support and attention to detail.

            </p>
          </div>
          <div className="flex flex-col items-center justify-center md:w-[460px] w-[100%]">
            {" "}
            <div className="text-[25px] font-extrabold md:text-[31px] text-light">
            </div>
            <div className="text-[40px] font-extrabold md:text-[80px] text-light leading-[80px]">
            Standard Materials

            </div>
            <p className="text-light md:text-[20px] text-[14px] w-full text-center">
              {" "}
              Utilizing high-quality materials for durable and reliable results
            </p>
          </div>
        </div>
      </div>

      <div className=" bg-dark py-20 px-[5%] flex md:flex-row flex-col  justify-between items-center md:gap-0 gap-20">
        <div className="md:w-[50%] w-full ">
          <TextFade animation="fade-down">
            <h1 className="md:text-[60px] text-[30px] font-bold text-light mb-10">
              Safe Environments, Excellent Service{" "}
            </h1>
          </TextFade>
          <p className="text-light md:text-[20px] text-[14px] w-full">
            At Stone Rockers Group, sustainability is at the core of our
            operations. We are dedicated to creating a positive impact on the
            environment, society, and the economy through responsible practices
            and innovative solutions. Our commitment to sustainability reflects
            our belief that progress and preservation can go hand in hand,
            paving the way for a brighter, more sustainable future for Nigeria.
          </p>
        </div>
        <div className="md:w-[35%] w-full">
          <img src={safetyImage1} alt="Safe Environment 1" className="w-full" />
        </div>
      </div>

      <div className="px-[5%] py-20">
        <h3 className="management-title ">Meet Our Founder</h3>
        <div className="flex mt-20 justify-between md:flex-row flex-col md:gap-0 gap-20">
          <div className="flex flex-col ">
            <img src={managementImage3} alt="CEO" />
            <p className="text-dark md:text-[20px] text-[14px] w-full mt-5">
              <b>Alhaji 
              </b> Kolawola Olaiya
            </p>
            <h6 className="text-secondary text-[14px] w-full">
              CEO “Stone Rockers NIG LTD”
            </h6>
          </div>
          <div className="flex flex-col ">
            <p className="text-dark md:text-[20px] text-[14px] w-full mt-5">
              {/* <b>JIM</b> Lee */}
            </p>
            <h6 className="text-secondary text-[14px] w-full">
              {/* Head of Innovation Department{" "} */}
            </h6>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
