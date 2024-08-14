import React from "react";
import "./ContactPage.css";
import emailIcon from "../../assets/mail.svg";
import phoneIcon from "../../assets/phoneIcon.png";
import addressIcon from "../../assets/officeIcon.png";
import TextFade from "../../components/CustomTexts/TextFade";
import Button from "../../components/Buttons/Button";

const ContactPage = () => {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="bg-dark md:w-[60%] w-full py-[20vh] md:px-[8%] px-[5%]">
        <TextFade animation="fade-down">
          <h1 className="md:text-[60px] text-[30px] font-bold text-white text-center">
            Contact Us
          </h1>{" "}
        </TextFade>{" "}
        <p className="text-white md:text-[20px] text-[14px] w-full text-center">
          We'd love to hear from you! Whether you have a question about our
          services, need assistance with a project, or want to provide feedback,
          our team is here to help.
        </p>
        <form className="mt-20 flex flex-col gap-10">
          <input
            className="border-secondary border bg-secondary/15 py-5 px-4 rounded-[8px] outline-secondary placeholder:text-white text-white focus:outline-none active:border-none"
            type="text"
            placeholder="Full Name"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border-secondary border bg-secondary/15 py-5 px-4 rounded-[8px] outline-secondary placeholder:text-white text-white focus:outline-none active:border-none"
          />
          <textarea
            placeholder="Write a message"
            className="border-secondary border bg-secondary/15 py-5 px-4 rounded-[8px] outline-secondary placeholder:text-white text-white focus:outline-none active:border-none"
            rows={10}
          ></textarea>
        </form>
        <div className="flex items-center justify-center w-full mt-20">
  <Button 
    click={() => window.location.href = 'mailto:info@stonerockers.com'} 
    value="contact us"   />
</div>
      </div>
      <div className=" bg-white flex flex-col gap-20 md:w-[40%] w-full py-[20vh] px-[5%]">
        <div className="flex flex-col md:flex-row md:items-start  bg-dark py-5 px-10 rounded-[8px] items-center gap-7">
          <img src={emailIcon} alt="Email Icon" />
          <div className="flex flex-col items-start justify-start ">
            <p className="mb-3 md:text-left text-center w-full text-white font-bold text-[20px]">
              Email Address
            </p>
            <a
              href="mailto:stonerockers298@gmail.com"
              className="text-light md:text-[16px] text-[14px] md:text-left text-center w-full leading-[20px] "
            >
              stonerockers298@gmail.com
            </a>
            <a
              href="mailto:info@stonerockers.com"
              className="text-light md:text-[16px] text-[14px] md:text-left text-center w-full leading-[20px]"
            >
              info@stonerockers.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start  bg-dark py-5 px-10 rounded-[8px] items-center gap-7">
          {" "}
          <img src={phoneIcon} alt="Phone Icon" />
          <div className="flex flex-col items-start justify-start ">
            <p className="mb-3 md:text-left text-center w-full text-white font-bold text-[20px]">
              Phone Number{" "}
            </p>
            <a
              href="tel:+2347044449882"
              className="text-light md:text-[16px] text-[14px] md:text-left text-center w-full leading-[20px] "
            >
              +234 (704) 4449 882{" "}
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start  bg-dark py-5 px-10 rounded-[8px] items-center gap-7">
          {" "}
          <img src={addressIcon} alt="Address Icon" />
          <div className="flex flex-col items-start justify-start ">
            <p className="mb-3 md:text-left text-center w-full text-white font-bold text-[20px]">
              Office Address{" "}
            </p>
            <a
              href="/"
              className="text-light md:text-[16px] text-[14px] w-full leading-[20px] md:text-left text-center"
            >
              Say Plaza, Plot 23, E.Abubakar Street, Utako District, FCT Abuja
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
