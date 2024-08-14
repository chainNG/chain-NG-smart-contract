import React from "react";
import { ArrowRight } from "../../assets/RenderedAssets";
import TextFade from "../CustomTexts/TextFade";

const WhatsNewItem = ({ item, onReadMore }) => {
  return (
    <TextFade isSpan={true} animation="zoom-in">
      <div className="bg-dark overflow-hidden bg-no-repeat bg-cover bg-center rounded-[20px]">
        <div className="w-full h-[297px] bg-cover bg-no-repeat overflow-hidden flex items-center justify-center object-cover">
          <img
            src={item.image}
            alt=""
            className="w-[100%] object-cover h-[100%]"
          />
        </div>
        <div className="flex flex-col gap-10 md:p-10 p-5">
          <h1 className="md:text-[25px] text-[20px] font-bold text-white">
            {item.title}
          </h1>
          <p className="text-white md:text-[18px] text-[14px] line-clamp-4">
            {item.description}
          </p>
          <div className="flex justify-end">
            <div
              onClick={onReadMore}
              className="text-secondary text-[14px] font-bold uppercase flex gap-2 items-center justify-center w-fit cursor-pointer"
            >
              Read More <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </TextFade>
  );
};

export default WhatsNewItem;

