import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from "../../assets/logo.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import linkedin from "../../assets/linkedin.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-dark pt-20">
      <div className="px-[5%] flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 w-full">
          <div className="w-fit relative flex flex-col">
            <Link to="/" className="w-fit">
              <img src={LOGO} alt="" />
            </Link>
            <p className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all ">
              Make the Solid Choice{" "}
            </p>
          </div>
          <div className="mt-14">
            <p className="text-secondary font-extrabold text-[14px] md:text-[19px] ease duration-800 transition-all ">
              QUICK LINKS
            </p>
            <div className="flex md:flex-row flex-col gap-7 mt-10">
              <Link
                to="/about"
                className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
              >
                About Us
              </Link>
              <Link
                to="/services/quarry"
                className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
              >
                Quarry
              </Link>{" "}
              <Link
                to="/services/real-estate"
                className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
              >
                Real Estate
              </Link>{" "}
              <Link
                to="/services/sand-dredging"
                className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
              >
                Sand Dredging
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:mt-0 mt-20">
          <div className="flex flex-col items-start md:items-end">
            <p className="text-secondary font-extrabold text-[14px] md:text-[19px] ease duration-800 transition-all ">
              EMAIL ADDRESS
            </p>
            <a
              href="mailto:stonerockers298@gmail.com"
              className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
            >
              stonerockers298@gmail.com
            </a>
            <a
              href="mailto:info@stonerockers.com"
              className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
            >
              info@stonerockers.com
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end mt-12">
            <p className="text-secondary font-extrabold text-[14px] md:text-[19px] ease duration-800 transition-all uppercase">
              Phone Number
            </p>
            <a
              href="tel:+234(704)4449882"
              className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
            >
              +234 (704) 4449 882
            </a>
          </div>
          <div className="flex flex-col items-start md:items-end mt-12">
            <p className="text-secondary font-extrabold text-[14px] md:text-[19px] ease duration-800 transition-all uppercase">
              Address
            </p>
            <a
              href="tel:+234(704)4449882"
              className="text-white font-medium text-[14px] md:text-[19px] ease duration-800 transition-all "
            >
              Say Plazza, Plot 23 A, E Ekukinam Street, Utako District, FCT
              Abuja
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-[1px] my-10"></div>
      <div className="px-[5%] flex flex-col-reverse md:flex-row justify-between items-start pb-5 md:gap-0 gap-4">
        <p className="text-[#EEF5FF]">Copyright ©{currentYear} Stone Rockers</p>
        <div className="flex gap-3">
          <img src={instagram} alt="" />
          <img src={linkedin} alt="" />
          <img src={facebook} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

