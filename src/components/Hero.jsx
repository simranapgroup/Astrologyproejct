// src/AllComponents.jsx

import React from "react";

// Import all your components here

import Navbar from "./Navbar";
import SecondSection from "./second";
import Banner from "./Banner";
import Services from "./Services";
import Blog from "./Blog";
import News from "./News";
import CommunicationButtons from "./Communicationbutton";
import Footer from "./Footer";



const Hero = () => {
  return (
    <div>
      <Navbar /> 
      <Banner/>
  <CommunicationButtons/> 
   
   {/* <SecondSection/>  */}
{/* <Services/> */}
<Blog/>
<News/>
<Footer/>

    </div>
  );
};

export default Hero;
