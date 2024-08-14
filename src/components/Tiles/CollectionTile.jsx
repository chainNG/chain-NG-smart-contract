import React from "react";
import { Star } from "../../assets/RenderedAssets";
import TextFade from "../CustomTexts/TextFade";
import { Link } from "react-router-dom";

const CollectionTile = ({ image, title, description, star, price }) => {
  return (
    <div className="rounded-[6px] bg-white shadow-md overflow-hidden border">
      <img src={image} alt="" className="w-full h-[227px]" />
      <div className="px-3 pt-3 pb-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] font-semibold">{title}</h1>
          <div className="flex bg-secondary/15 py-1 px-4 justify-center items-center gap-2 rounded-full w-fit">
            <p className="text-[14px] font-semibold">{star}</p>
            <Star />
          </div>
        </div>
        <p className="text-dark/40 text-[14px] line-clamp-3 overflow-ellipsis">
          <TextFade animation="fade-down">{description}</TextFade>
        </p>
        <div className="mt-5 flex items-center justify-between">
          <Link
            to="/contact"
            className={`rounded-md text-dark bg-secondary/20 py-2 px-12 font-bold text-20 transition-all duration-500 ease-in-out `}
          >
            Contact
          </Link>
          <p className="text-[14px] font-semibold">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionTile;

