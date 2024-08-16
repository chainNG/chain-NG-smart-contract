import React from 'react';
import IMGACT from "../../assets/act.png";
import TextFade from "../CustomTexts/TextFade";
import Button from "../Buttons/Button";

const CallToActionSection = () => {
  return (
    <div
      className="flex-col py-20 px-[5%] h-[75vh] flex w-[100%] items-center justify-center bg-no-repeat bg-cover bg-center transition-all duration-1000 ease-in-out bg-dark"
      style={{
        backgroundImage: `url('${IMGACT}')`
      }}
    >
      <TextFade animation="fade-up">
        <h1 className="md:text-[60px] text-[27px] font-semibold text-white transition-all duration-1000 ease-in-out md:tracking-[-4px] tracking-[-1px] text-center ">
          We Would <span className="uppercase text-dark">Love </span>{" "}
          To <span className="uppercase text-dark">Discuss  </span>.{" "}
          <br className="md:block hidden" />{" "}
          <span className="block md:hidden mr-1"></span> Your Upcoming Projects.
        </h1>
      </TextFade>
      <div className="flex items-center justify-center mt-10">
        <Button value="Contact Us" btnColor="bg-dark" url="/contact"/>
      </div>
    </div>
  );
};

export default CallToActionSection;

