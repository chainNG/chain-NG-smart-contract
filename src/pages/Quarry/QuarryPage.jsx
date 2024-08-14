import React from "react";
import SDBG from "../../assets/sdbg.png";
import SDIMG from "../../assets/sdimg.png";
import P7 from "../../assets/p7.jpg";
import P8 from "../../assets/p8.jpg";
import P1 from "../../assets/p1.png";
import P9 from "../../assets/p9.jpg";
import P5 from "../../assets/p5.png";
import TextFade from "../../components/CustomTexts/TextFade";
import ScrollDown from "../../assets/scrollDown.svg";
import CallToActionSection from "../../components/Others/CallToActionSection";

const SandDredgingPage = () => {
  const images = [P7, P8, P1, P9, P5];
  return (
    <div>
      <div
        className="flex-col h-[100vh] w-[100%] items-center justify-center bg-no-repeat bg-cover bg-center transition-all duration-1000 ease-in-out bg-dark"
        style={{
          backgroundImage: `url('${SDBG}')`,
        }}
      >
        <div className="h-full w-full flex px-[5%] flex-col gap-10 items-start justify-center">
          <TextFade animation="fade-up">
            <h1 className="md:text-[60px] text-[30px] font-bold text-white transition-all duration-1000 ease-in-out ">
              Quarry
            </h1>
          </TextFade>
          <p className="text-light md:text-[20px] text-[14px] md:w-[45%] w-full">
          Stone Rockers Quarry, strategically located at Kuje, Abuja, serves just about any part of the FCT.          </p>
        </div>
        <div className="flex items-center flex-col justsify-center w-full  h-fit gap-2 absolute bottom-10">
          <img src={ScrollDown} alt="" />
          <p className="text-light text-center text-[14px] italic">
            Scroll Down
          </p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col border py-44 px-[5%] justify-between bg-light">
        <div className="md:w-1/2 w-full flex flex-col">
          <div className="h-full w-full flex flex-col gap-10 items-start justify-center">
            <TextFade animation="fade-up">
              <h1 className="md:text-[60px] text-[30px] font-bold text-dark transition-all duration-1000 ease-in-out ">
              Our Processes              </h1>
            </TextFade>
            <p className="text-dark md:text-[20px] text-[14px] ">
We adhere to rigorous safety protocols including regular training, use of protective gear, and advanced dust control systems to ensure a secure working environment. Quality is maintained through practices like controlled blasting, precise crushing, and thorough screening to deliver top-grade materials. Our dedication to these standards ensures both the safety of our team and the excellence of our products.            </p>
          </div>
          <div className="my-20">
            <div className="md:w-1/2 w-full md:hidden flex items-center justify-end">
              <img src={SDIMG} alt="" />
            </div>
          </div>

          <div className="h-full w-full flex flex-col gap-10 items-start justify-center">
            <TextFade animation="fade-up">
              <h1 className="md:text-[60px] text-[30px] font-bold text-dark transition-all duration-1000 ease-in-out ">
              Safety and quality
              </h1>
            </TextFade>
            <p className="text-dark md:text-[20px] text-[14px] ">
            We adhere to rigorous safety protocols including regular training, use of protective gear, and advanced dust control systems to ensure a secure working environment. Quality is maintained through practices like controlled blasting, precise crushing, and thorough screening to deliver top-grade materials. Our dedication to these standards ensures both the safety of our team and the excellence of our products.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full hidden md:flex items-center justify-end">
          <img src={SDIMG} alt="" />
        </div>
      </div>

      <div className="bg-dark py-40 px-[5%] ">
        <div className="h-full w-full flex flex-col gap-10 items-start justify-center">
          <TextFade animation="fade-up">
            <h1 className="md:text-[60px] text-[30px] font-bold text-light transition-all duration-1000 ease-in-out ">
              Projects
            </h1>
          </TextFade>
          <p className="text-light md:text-[20px] text-[14px] md:w-[95%] w-full">
           We offer a diverse range of quality core material, including boulders (1m), hardcore (300mm), and various aggregates like 1", 2", 3/4", and 1/2" stones, stone dust, and custom stonebase mixtures. These materials are ideal for construction, road building, concrete production, sand bedding, and landscaping, ensuring superior quality and size consistency. 
          </p>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-28 my-28 ">
          {" "}
          {images.map((item, index) => (
            <img
              src={item}
              alt=""
              key={index}
              className="h-[306px] w-[407px] object-cover"
            />
          ))}
        </div>
      </div>
      <CallToActionSection />
    </div>
  );
};

export default SandDredgingPage;
