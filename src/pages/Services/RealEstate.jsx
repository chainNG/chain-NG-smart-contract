import React from "react";
// import "./RealEstate.css";
import TextFade from "../../components/CustomTexts/TextFade";
import Button from "../../components/Buttons/Button";
import IMG1 from "../../assets/rect50.png";
import IMG2 from "../../assets/rect51.png";

const RealEstate = () => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center w-full px-[5%] mt-20 gap-10">
      <div className="flex md:w-[45%] w-full gap-5 md:justify-start justify-between">
        <img src={IMG1} alt="" className="mb-14 w-[45%]" />
        <img src={IMG2} alt="" className="mt-14 w-[45%]" />
      </div>
      <div className="md:w-[50%] w-full">
        <TextFade animation="fade-down">
          <h1 className="md:text-[60px] text-[30px] font-bold text-secondary mb-10">
            REAL ESTATE
          </h1>{" "}
        </TextFade>
        <p className="text-dark md:text-[20px] text-[14px] w-full">
          From residential to commercial spaces, Stone Rockers boasts a grand
          collection of luxurious buildings constructed with diverse customer
          tastes in mind. Explore our collection.
        </p>
        <div className="mt-20"></div>
        <Button url="/services/real-estate" value="Learn More" />
      </div>
    </div>
  );
};

export default RealEstate;
