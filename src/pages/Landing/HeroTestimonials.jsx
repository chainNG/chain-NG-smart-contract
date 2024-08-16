import React, { useState } from 'react';
import TextFade from "../../components/CustomTexts/TextFade";
import STARS from "../../assets/stars.svg";
import NEXT from "../../assets/next.svg";
import PREV from "../../assets/prev.svg";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import { Testimonials } from "../../lib/constants";

const HeroTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="overflow-x-hidden px-[5%] py-20 bg-dark">
      <TextFade animation="fade-right">
        <h1 className="md:text-[60px] text-[30px] font-bold text-light">
          Testimonials
        </h1>
      </TextFade>
      <div className="flex items-center gap-32 mt-20">
        <div className="w-[45%] h-[45vh] md:block hidden">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            spaceBetween={50}
            slidesPerView={3}
            direction={"vertical"}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className=" w-full h-full"
          >
            {Testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`py-5 px-7 flex items-center justify-start gap-7 ${
                    currentSlide === index ? "bg-secondary" : "bg-secondary/15"
                  }  rounded-[12px] w-full`}
                >
                  <div className=" text-[28px] font-bold text-white rounded-full w-[80px] h-[80px] bg-secondary/40 flex items-center justify-center">
                    AN
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-bold text-light">
                      {testimonial.name}
                    </h1>
                    <p className=" text-[15px] font-light  text-light w-[70%]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col md:w-1/2 w-full ">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className=" w-full"
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          >
            {Testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <h1 className="text-[25px] md:text-[49px] font-bold text-light">
                  {testimonial.name}
                </h1>
                <p className="md:hidden block text-[20px] font-light text-light w-full  ">
                  {testimonial.role}
                </p>
                <img src={STARS} alt="" />
                <p className="md:text-[23px] text-[14px] font-light text-light w-full  mt-10">
                  {testimonial.testimony}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-start gap-20 mt-20">
            <img
              src={PREV}
              alt=""
              className="swiper-button-prev cursor-pointer"
            />{" "}
            <img
              src={NEXT}
              alt=""
              className="swiper-button-next cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTestimonials;

