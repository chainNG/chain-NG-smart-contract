import React, { useState } from "react";
import TextFade from "../../components/CustomTexts/TextFade";
import { WhatsNewItemData } from "../../lib/constants";
import WhatsNewItem from "../../components/Tiles/WhatsNewItem";
import WhatsNewModal from "../../components/Tiles/WhatsNewModal";

const HeroWhatsNew = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleReadMore = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="overflow-x-hidden py-20">
      <div className="flex w-full px-[5%] flex-col items-start justify-center py-12 bg-dark">
        <TextFade animation="fade-right">
          <h1 className="md:text-[60px] text-[30px] font-bold text-secondary">
            What's New?
          </h1>
        </TextFade>
        <p className="text-light md:text-[20px] text-[14px] md:w-[45%] w-full">
          <TextFade animation="fade-right">
            Get to know our latest developments
          </TextFade>
        </p>
      </div>
      <div className="w-full px-[5%] md:flex-row flex-col flex justify-between items-center gap-20 mt-24">
        {WhatsNewItemData.items.map((item, index) => (
          <WhatsNewItem
            key={index}
            item={item}
            onReadMore={() => handleReadMore(item)}
          />
        ))}
      </div>
      {selectedItem && (
        <WhatsNewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedItem.title}
          image={selectedItem.image}
          description={selectedItem.description}
        />
      )}
    </div>
  );
};

export default HeroWhatsNew;

