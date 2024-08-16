import React from 'react';
import { WhyChooseUsRealEstateData } from "../../lib/constants";
import TextFade from "../../components/CustomTexts/TextFade";
import WhyChooseUsEstateTile from "../../components/Tiles/WhyChooseUsEstateTile";
import Button from "../../components/Buttons/Button";

const WhyChooseUsRealEstate = () => {
  return (
    <div className="bg-dark px-[5%] py-20 flex flex-col items-center">
      <TextFade animation="fade-down">
        <h1 className="md:text-[60px] text-center text-[30px] font-bold text-white">
          Why Choose Us
        </h1>
      </TextFade>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-28 my-28 ">
        {WhyChooseUsRealEstateData.items.map(
          (item, index) => (
            <WhyChooseUsEstateTile
              icon={item.icon}
              title={item.title}
              description={item.description}
              key={index}
            />
          )
        )}
      </div>
      <Button value="Schedule a Tour or Purchase" url="/contact" />
      <div className="mb-12"></div>
    </div>
  );
};

export default WhyChooseUsRealEstate;

