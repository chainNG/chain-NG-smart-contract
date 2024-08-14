import React from "react";
import TextFade from "../../components/CustomTexts/TextFade";
import CollectionTile from "../../components/Tiles/CollectionTile";
import { CollectionData } from "../../lib/constants";
import { CollectionTileItem } from "../../types";

const RealEstateCollection = ({ id }: { id: string }) => {
  return (
    <div id={id} className="w-full px-[5%] py-20">
      <TextFade animation="fade-down">
        <h1 className="md:text-[60px] text-[30px] font-bold text-dark">
          Explore our collection
        </h1>
      </TextFade>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-28 my-28 ">
        {" "}
        {CollectionData.items.map((item: CollectionTileItem, index) => (
          <CollectionTile
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            star={item.star}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RealEstateCollection;
