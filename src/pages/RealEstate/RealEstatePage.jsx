import React from "react";
import BG from "../../assets/rebg.svg";
import REHOUSE from "../../assets/rehouse.png";
import TextFade from "../../components/CustomTexts/TextFade";
import Button from "../../components/Buttons/Button";
import RealEstateCollection from "./RealEstateCollection";
import WhyChooseUsRealEstate from "./WhyChooseUsRealEstate";
import CallToActionSection from "../../components/Others/CallToActionSection";

const RealEstatePage = () => {
  return (
    <div>
      <div
        className="h-[110vh] flex md:flex-row flex-col justify-between items-center bg-white w-full bg-no-repeat bg-cover md:gap-0 gap-20"
        style={{
          backgroundImage: `url('${BG}')`,
          backgroundPosition: "bottom",
        }}
      >
        <div className="h-full md:w-1/2 w-full flex pl-[5%] md:pr-0 pr-[5%] flex-col gap-10 items-start justify-center md:mt-0 mt-28">
          <TextFade animation="fade-up">
            <h1 className="md:text-[60px] text-[30px] font-bold text-white transition-all duration-1000 ease-in-out  ">
              <br className="text-red md:text-[20px] text-[14px] w-full"></br>{" "}
              <span className="text-secondary uppercase">Real Estate</span> - Get the{" "}
              <br className="md:block hidden" />
              keys to Your Dream Home
            </h1>
          </TextFade>
          <p className="text-light md:text-[20px] text-[14px] w-full">
            A grand collection of luxurious residential and commercial
            structures constructed with unique styles, finishings, and standard
            materials, to meet diverse customer tastes.
          </p>
          <Button value=" View Properties" url="/services/real-estate/#collection" />
        </div>
        <div className="md:w-1/2 w-full h-full">
          <img src={REHOUSE} alt="building" />
        </div>
      </div>
      <RealEstateCollection id="collection" />
      <WhyChooseUsRealEstate />
      <CallToActionSection />
    </div>
  );
};

export default RealEstatePage;
