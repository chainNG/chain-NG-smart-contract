/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from "react";
import Hero1 from "../../assets/hero1.png";
import Hero2 from "../../assets/hero2.png";
import Hero3 from "../../assets/hero3.png";
import TextFade from "../../components/CustomTexts/TextFade";
import Button from "../../components/Buttons/Button";

const Hero = () => {
  const texts = [
    {
      mainText: "Building ",
      highlightText: "Tomorrow,",
      subText: " Starting",
      secondaryText: "Today",
      paragraphText: "Stone Rockers is taking Nigeria's infrastructure to developed country standards by prioritizing creativity in designs and execution.",
    },
    {
      mainText: "Turning Grand ",
      highlightText: "Ideas,",
      subText: " into",
      secondaryText: "Great Products",
      paragraphText: "Nothing is impossible at Stone Rockers. We take the risks to bring your vision to reality.",
    },
    {
      mainText: "Solid ",
      highlightText: "Foundations,",
      subText: " Sustainable",
      secondaryText: "Solutions",
      paragraphText: "Stone Rockers is known for strong foundations and green engineering, with a keen eye for sustaining the planet.",
    },
  ];

  const images = [Hero2, Hero1, Hero3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image and text every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const { mainText, highlightText, subText, secondaryText, paragraphText } = texts[currentIndex];

  return (
    <div
      className="flex-col h-[100vh] w-[100%] items-center justify-center bg-no-repeat bg-cover bg-center transition-all duration-1000 ease-in-out bg-dark"
      style={{
        backgroundImage: `url('${images[currentIndex]}')`,
      }}
    >
      <div className="h-full w-full flex px-[5%] flex-col gap-10 items-start justify-center">
        <TextFade animation="fade-up">
          <h1 className="md:text-[60px] text-[30px] font-bold text-white transition-all duration-1000 ease-in-out">
            {mainText}
            <span className=" text-secondary">{highlightText}</span>
            <br className="md:block hidden" />
            <TextFade
              animation="fade-down"
              isSpan={true}
              style=" text-secondary transition-all duration-1000 ease-in-out"
            >
              {subText}
            </TextFade>{" "}
            {secondaryText}
          </h1>
        </TextFade>
        <p className="text-light md:text-[20px] text-[14px] md:w-[45%] w-full transition-all duration-1000 ease-in-out">
          {paragraphText}
        </p>
        <Button value="Contact Us" url="/contact" />
      </div>
    </div>
  );
};

export default Hero;
