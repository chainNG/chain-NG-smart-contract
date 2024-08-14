import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "../../assets/RenderedAssets";
import TextFade from "../CustomTexts/TextFade";

const HeroServiceItem = ({ bg, image, title, description, url }) => {
  return (
    <TextFade isSpan={true} animation="zoom-in">
      <div
        className="bg-dark bg-no-repeat bg-cover bg-center rounded-[20px] md:p-10 p-5 flex flex-col gap-10"
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <img src={image} alt="" className="md:w-[190px] w-[120px]" />
        <h1 className="md:text-[40px] text-[28px] font-bold text-white">
          {title}
        </h1>
        <p className="text-white md:text-[20px] text-[14px]">{description}</p>
        <div className="flex justify-end">
          <Link
            to={url}
            className="text-secondary text-[14px] font-bold uppercase flex gap-2 items-center justify-center w-fit"
          >
            Read More <ArrowRight />{" "}
          </Link>
        </div>
      </div>
    </TextFade>
  );
};

export default HeroServiceItem;

