import React from "react";
import TextFade from "../../components/CustomTexts/TextFade";
import HeroServiceItem from "../../components/Tiles/HeroServiceItem";
import { HeroServiceItemData } from "../../lib/constants";

const HeroServices = () => {
  return (
    <div className="overflow-x-hidden px-[5%] py-20 bg-light">
      <div className="flex w-full md:flex-row mg:gap-0 gap-10 flex-col items-end justify-between ">
        <TextFade animation="fade-right">
          <h1 className="md:text-[60px] text-[30px] font-bold text-dark ">
            We Embed Excellence In Every Construction Endeavor.
          </h1>
        </TextFade>
        <p className="text-dark md:text-[20px] text-[14px] md:text-right md:w-[45%] w-full">
          <TextFade animation="fade-left">
          Stone Rockers Nig. Ltd. is an indigenous construction group founded in 2019 with the goal of providing Nigerians with quality building products and services. We are committed to delivering excellence, innovation, and sustainable solutions for all your construction needs.
          </TextFade>
        </p>
      </div>
      <div className="w-full md:flex-row flex-col flex justify-between items-center gap-20 mt-24">
        {HeroServiceItemData.items.map((item, index) => (
          <HeroServiceItem
            bg={item.bg}
            image={item.image}
            title={item.title}
            description={item.description}
            url={item.url}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroServices;

