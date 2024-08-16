import React, { useCallback, useEffect, useState } from 'react';
import LOGO from "../../assets/logo.svg";
import { NavBurger, NavClose } from "../../assets/RenderedAssets";
import { Link } from 'react-router-dom';
import { NavItem } from './NavItems';
import { NavItems } from "../../lib/constants";

const SideNav = () => {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  const toggleNavbar = () => {
    setIsOpenNavbar(!isOpenNavbar);
  };

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const currentScrollY = window.scrollY;

    if (currentScrollY >= 500 && lastScrollY < 500) {
      // console.log("Reached 200px height");
    }

    if (currentScrollY < lastScrollY) {
      if (scrollDirection !== "up") {
        setScrollDirection("up");
      }
    } else if (currentScrollY > lastScrollY) {
      if (scrollDirection !== "down") {
        setScrollDirection("down");
      }
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, scrollDirection]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div
        className={`${
          typeof window !== "undefined" && window.scrollY >= 200
            ? "bg-dark"
            : "bg-transparent"
        } ${
          scrollDirection === "up" ? "top-0" : "top-[-100%]"
        } flex transition-all duration-500 ease-in-out fixed left-0 w-full items-center justify-between py-5 px-[5%] z-[9] `}
      >
        <Link to="/">
          <img src={LOGO} alt="" />
        </Link>
        <NavBurger
          className="text-light cursor-pointer"
          onClick={toggleNavbar}
        />
      </div>
      <div
        className={`${
          isOpenNavbar ? "right-0" : "right-[-110%]"
        } fixed top-0 md:w-[600px]  w-full border-l-2 border-light h-full backdrop-blur-sm  bg-dark/60 transition-all duration-500 ease-in-out md:py-32 pt-20 z-10  px-10`}
      >
        <NavClose
          className="text-light cursor-pointer absolute md:top-10 top-5 right-5 md:right-10"
          onClick={toggleNavbar}
        />
        {NavItems.items.map((child, index) => (
          <NavItem
            key={index}
            item={child}
            isOpenNavbar={isOpenNavbar}
            closeNavbar={toggleNavbar}
          />
        ))}{" "}
      </div>
    </>
  );
};

export default SideNav;

