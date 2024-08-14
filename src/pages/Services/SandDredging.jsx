import React from "react";
import Button from "../../components/Buttons/Button";
import TextFade from "../../components/CustomTexts/TextFade";
import IMG1 from "../../assets/rect48.png";
import IMG2 from "../../assets/rect49.png";

const SandDredging = () => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center w-full px-[5%] mt-20 gap-10">
      <div className="flex md:w-[45%] w-full gap-5 md:justify-start justify-between">
        <img src={IMG1} alt="" className="mb-14 w-[45%]" />
        <img src={IMG2} alt="" className="mt-14 w-[45%]" />
      </div>
      <div className="md:w-[50%] w-full">
        <TextFade animation="fade-down">
          <h1 className="md:text-[60px] text-[30px] font-bold text-secondary mb-10">
            SAND DREDGING
          </h1>{" "}
        </TextFade>
        <p className="text-dark md:text-[20px] text-[14px] w-full">
          {" "}
          Stone Rockers utilizes cutting-edge dredging equipment such as
          hydraulic dredgers, cutter suction dredgers, and hopper dredgers,
          ensuring efficient and eco-friendly extraction. Our technology
          includes GPS for precise location tracking, real-time monitoring
          systems, and sediment separation units, which enhance the quality of
          the dredged sand and minimize environmental impact. These advanced
          practices ensure our commitment to sustainability and the delivery of
          top-quality sand for various construction and land reclamation
          projects.
        </p>
        <div className="mt-20"></div>
        <Button url="/services/sand-dredging" value="Learn More" />
      </div>
    </div>
  );
};

export default SandDredging;
