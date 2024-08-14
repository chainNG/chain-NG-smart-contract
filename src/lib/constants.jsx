import HS1 from "../assets/hs1.svg";
import HS2 from "../assets/hs2.svg";
import HS3 from "../assets/hs3.svg";
import HSBG1 from "../assets/hsbg1.svg";
import HSBG2 from "../assets/hsbg2.svg";
import HSBG3 from "../assets/hsbg3.svg";
import Collection2 from "../assets/collection2.png";
import Collection3 from "../assets/collection3.png";
import WCS1 from "../assets/wcs1.svg";
import p1 from "../assets/p1.png";
import GAL8 from "../assets/gal8.jpg";
import p3 from "../assets/p3.png";

export const NavItems = {
  items: [
    {
      heading: "Home",
      url: "/",
      delay: 300,
      overview: "Start here to find the latest updates and highlights from our site.",
    },
    {
      heading: "About Us",
      url: "/about",
      delay: 350,
      overview: "Learn more about our company, our values, and our mission.",
    },
    {
      heading: "Product & Services",
      url: "/services",
      delay: 400,
      overview: "Explore our diverse range of products and services, including Query, Real Estate, and Sand Dredging.",
      dropdownItem: [
        {
          value: "Quarry",
          link: "/services/quarry",
        },
        {
          value: "Real Estate",
          link: "/services/real-estate",
        },
        {
          value: "Sand Dredging",
          link: "/services/sand-dredging",
        },
      ],
    },
    {
      heading: "Contact",
      url: "/contact",
      delay: 500,
      overview: "Reach out to us with any questions, feedback, or inquiries.",
    },
  ],
};

export const HeroServiceItemData = {
  items: [
    {
      bg: HSBG1,
      image: HS1,
      title: "Sand Dredging",
      description: "Excellent sand dredging operations to improve water features, reshape land, and supply top-grade sand for construction and land reclamation projects.",
      url: "/services/sand-dredging",
    },
    {
      bg: HSBG2,
      image: HS2,
      title: "Quarry",
      description: "High quality granite in ideal sizes for road construction, concrete production, asphalt plants, and various civil engineering applications.",
      url: "/services/quarry",
    },
    {
      bg: HSBG3,
      image: HS3,
      title: "Real Estate",
      description: "Modern structures built with quality materials and by certified experts which guarantee high return on investment and property appreciation.",
      url: "/services/real-estate",
    },
  ],
};

export const WhatsNewItemData = {
  items: [
    {
      image: p1,
      title: "The future of Quarry",
      description: "Stone Rockers now has a quarry located in Kuje, Abuja, which would be supplying coarse and fine aggregates to residents in ",
    },
    {
      image: GAL8,
      title: "The future of Real Estate",
      description: "We are about to complete a massive 6 bedroom Standalone in Guzape Hills Abuja. This marvel has 2 suspended floors including a",
    },
    {
      image: p3,
      title: "The future of Sand Dredging",
      description: "Stone dredging activities have been moved to Abuja. We are open to booking via the website and our social media platforms.",
    },
  ],
};

export const CollectionData = {
  items: [
    {
      image: GAL8,
      title: "4 Bedroom Flat (Guzape)",
      description: "A fully fitted 4 bedroom terrace duplex with an attached BQ, 5 restrooms, 2 suspended floors, corner piece, 280 square metres, located in Guzape.",
      star: "5",
      price: "23,650.99",
    },
    {
      image: Collection2,
      title: "3 Bedroom Flat (Lugbe)",
      description: "A grand collection of luxurious residential and commercial structures constructed with unique styles, finishings, and standard materials, to meet diverse customer tastes.",
      star: "5",
      price: "7,995.99",
    },
    {
      image: Collection3,
      title: "6 Bedroom Flat (Guzape)",
      description: "A 6-bedroom Standalone terrace duplex with 2 bedroom BQ, 2 suspended floors with penthouse, parking lot, good roads, located in an estate in Guzape.",
      star: "5",
      price: "2,660.99",
    },
  ],
};

export const WhyChooseUsRealEstateData = {
  items: [
    {
      icon: WCS1,
      title: "Value",
      description: "We give you value for your money, ensuring the best quality and cost-effectiveness.",
    },
    {
      icon: WCS1,
      title: "Expertise",
      description: "Our team of engineers and architects come with the experience and certifications required to expertly construct any building.",
    },
    {
      icon: WCS1,
      title: "Results",
      description: "Stone Rockers always delivers more than what the clients need whilst carrying the client along. We build the best.",
    },
  ],
};

export const Testimonials = [
  {
    name: "Sarah Johnson",
    role: "Development Manager",
    testimony: "Sabi Training & Consulting has been instrumental in empowering our local teams to excel in complex development projects. The tailored training and ongoing support have been invaluable in improving our project outcomes. Thank you, Sabi!",
  },
  {
    name: "David Osei",
    role: "Business Consultant",
    testimony: "Sabi's 'know-how' has been a game changer for our business consultancy. Their partnership and contextualized service have greatly enhanced our ability to deliver solutions to our clients. Sabi is truly a valuable ally.",
  },
  {
    name: "Amina Suleiman",
    role: "Student",
    testimony: "As a student, Sabi Training & Consulting has been the bridge to my academic success. Their training programs have equipped me with essential skills and knowledge. I owe my academic achievements to Sabi.",
  },
  {
    name: "Michael Kofi",
    role: "Humanitarian Coordinator",
    testimony: "Sabi's support has been instrumental in helping us realize our humanitarian vision. Their collaboration and tools have enhanced our impact, making a real difference in the lives of those we serve.",
  },
  {
    name: "Maria Fernandez",
    role: "NGO Supporter",
    testimony: "I've witnessed Sabi's commitment to delivering excellence in training and consulting service. Their partnership with Humentum ensures high-quality courses at an affordable cost. Sabi truly bridges the gap between knowledge and action.",
  },
];
