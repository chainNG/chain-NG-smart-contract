import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "../../assets/RenderedAssets";

export const NavItem = ({ item, isOpenNavbar, closeNavbar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerHeight <= 775);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const handleClick = () => {
    closeNavbar(); // Close the navbar when a link is clicked
  };

  return (
    <Link
      to={item.url}
      className={`text-white leading-tight ${
        isOpenNavbar ? "opacity-1" : "opacity-0"
      } ${
        isSmallScreen ? "mt-7" : "mt-12"
      } transition-all duration-500 hover:text-lightBlue flex flex-col items-left  group relative w-full group`}
      style={{ transitionDelay: `${item.delay}ms` }}
      onClick={handleClick}
    >
      <div className="w-full flex items-center group justify-between">
        <h1
          className={`${
            isSmallScreen ? "" : " "
          } uppercase md:text-[38px]  text-[24px]  w-fit font-bold   group-hover:text-secondary transition-all duration-500`}
        >
          {item.heading}
        </h1>
        {item.dropdownItem != null && (
          <NavDropdown className="group-hover:text-secondary transition-all duration-500" />
        )}
      </div>
      <div className="w-full bg-white h-[1px] my-5"></div>
      <p className=" font-light text-[14px] ease duration-800 transition-all md:block hidden">
        {item.overview}
      </p>

      {item.dropdownItem != null && (
        <div className="group-hover:flex md:hidden flex bg-secondary/25 py-5 px-5 rounded-md justify-between transition-all duration-500 mt-5 gap-5 flex-wrap">
          {item.dropdownItem.map((dropI, index) => (
            <Link
              to={dropI.link}
              className="hover:text-dark transition-all duration-500 underline"
              key={index}
            >
              {dropI.value}
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
};

