import React from "react";
import "./Quarry.css";
import TextFade from "../../components/CustomTexts/TextFade";
import Button from "../../components/Buttons/Button";
import IMG1 from "../../assets/rect50.png";
import IMG2 from "../../assets/rect51.png";
const Quarry = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-center w-full px-[5%] mt-20 md:gap-0 gap-10">
      <div className="md:w-[50%] w-full">
        <TextFade animation="fade-down">
          <h1 className="md:text-[60px] text-[30px] font-bold text-secondary mb-10">
            QUARRY
          </h1>{" "}
        </TextFade>
        <p className="text-dark md:text-[20px] text-[14px] w-full">
          {" "}
          After thorough geological surveys, we employ advanced crushing and
          screening to produce refined stone products. Each step is guided by
          rigorous quality control to meet the highest standards. Environmental
          stewardship and timely delivery is prioritized, ensuring reliable,
          sustainable solutions for your construction needs.
        </p>
        <div className="mt-20"></div>
        <Button url="/services/quarry" value="Learn More" />
      </div>
      <div className="flex md:w-[45%] w-full gap-5 md:justify-end justify-between">
        <img src={IMG1} alt="" className="mb-14 w-[45%]" />
        <img src={IMG2} alt="" className="mt-14 w-[45%]" />
      </div>
    </div>
  );
};

export default Quarry;
