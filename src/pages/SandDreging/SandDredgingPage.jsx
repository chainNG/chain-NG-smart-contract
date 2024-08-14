import React from "react";
import SDBG from "../../assets/sdbg.png";
import SDIMG from "../../assets/sdimg.png";
import P1 from "../../assets/p1.png";
import P2 from "../../assets/p2.png";
import P3 from "../../assets/p3.png";
import P4 from "../../assets/sand1.jpg";
import P5 from "../../assets/images.jpeg";
import TextFade from "../../components/CustomTexts/TextFade";
import ScrollDown from "../../assets/scrollDown.svg";
import CallToActionSection from "../../components/Others/CallToActionSection";

const SandDredgingPage = () => {
  const images = [P1, P2, P3, P4, P5];
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
              Sand Dredging
            </h1>
          </TextFade>
          <p className="text-light md:text-[20px] text-[14px] md:w-[45%] w-full">
          Eco-friendly sand dredging, providing high-quality sand for construction and land reclamation projects in Aba, Abia State- Nigeria.
          </p>
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
                Equipment and Technology
              </h1>
            </TextFade>
            <p className="text-dark md:text-[20px] text-[14px] ">
              Stone Rockers utilizes cutting-edge dredging equipment to ensure
              efficient and eco-friendly extraction. Our technology includes GPS
              for precise location tracking, real-time monitoring systems, and
              sediment separation units, which enhance the quality of the
              dredged sand and minimize environmental impact. These advanced
              practices ensure our commitment to sustainability and the delivery
              of top-quality sand for various construction and land reclamation
              projects.
            </p>
          </div>
          <div className="my-20">
            <div className="md:w-1/2 w-full md:hidden flex items-center justify-end">
              <img src={SDIMG} alt="" />
            </div>
          </div>

          <div className="h-full w-full flex flex-col gap-10 items-start justify-center">
            <TextFade animation="fade-up">
              <h1 className="md:text-[60px] text-[30px] font-bold text-dark transition-all duration-1000 ease-in-out ">
                Environmental Impact
              </h1>
            </TextFade>
            <p className="text-dark md:text-[20px] text-[14px] ">
              We have extensive expertise in dredging and reclamation projects,
              and we have honed our ability to balance diverse requirements
              effectively, ensuring optimal cost-efficiency while minimizing
              environmental impact
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
          <p className="text-light md:text-[20px] text-[14px] md:w-[35%] w-full">
            We have successfully completed several dredging projects,
            contributing to infrastructure development and environmental
            preservation across Aba's waterways.
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
