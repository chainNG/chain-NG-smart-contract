import React from "react";

const WhyChooseUsEstateTile = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center p-14 bg-[#00318F]/20 rounded-[19px]">
      <img src={icon} alt="" />
      <h1 className="text-white font-semibold text-[22px] text-center">
        {title}
      </h1>
      <p className="text-center text-white text-[14px] font-normal">
        {description}
      </p>
    </div>
  );
};

export default WhyChooseUsEstateTile;

