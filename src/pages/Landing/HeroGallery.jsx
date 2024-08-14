import React, { useEffect, useState } from "react";
import TextFade from "../../components/CustomTexts/TextFade";
import { GalleryTileA, GalleryTileF } from "../../components/Tiles/GalleryTile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HeroGallery = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 549);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const newSettings = {
      dots: false,
      infinite: true,
      slidesToShow: isSmallScreen ? 2 : 7,
      slidesToScroll: 1,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 0,
      cssEase: "linear",
      arrows: false,
    };
    setSettings(newSettings);
  }, [isSmallScreen]);

  return (
    <div className="overflow-x-hidden  py-20 bg-white">
      <div className="flex w-full px-[5%] flex-col items-center justify-center">
        <TextFade animation="fade-down">
          <h1 className="md:text-[60px] text-[30px] font-bold text-dark">
            Our Gallery
          </h1>
        </TextFade>
        <p className="text-dark md:text-[20px] text-[14px] text-center md:w-[65%] w-full">
          <TextFade animation="fade-down">
            See how we've brought the tasks of our clients to life across a
            range of construction projects.
          </TextFade>
        </p>
      </div>
      <div className="mt-20">
        <div className="flex gap-[20px] items-center justify-center ">
          <Slider {...settings} className="w-[100vw]">
            <GalleryTileA />
            <GalleryTileF />
            <GalleryTileA />
            <GalleryTileF />
            <GalleryTileA />
            <GalleryTileF />
            <GalleryTileA />
            <GalleryTileF />
            <GalleryTileA />
            <GalleryTileF />
            <GalleryTileA />
            <GalleryTileF />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;

