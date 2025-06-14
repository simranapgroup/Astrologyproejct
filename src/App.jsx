import { Routes, Route } from "react-router-dom";
// Adjust the path as needed
import SecondSection from "./components/second";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Blog from "./components/Blog";
import News from "./components/News";
import CommunicationButtons from "./components/Communicationbutton";
import Footer from "./components/Footer";


function App() {
  return (
    <Routes>
      <Route path='/'element={<Hero/>}/>
   
       <Route path="/second" element={<SecondSection/>} />
              <Route path="/navbar" element={<Navbar/>} />
                <Route path="/services" element={<Services/>} />
                    <Route path="/blog" element={<Blog/>} />
                      <Route path="/news" element={<News/>} />
                         <Route path="/buttons" element={<CommunicationButtons/>} />
                         <Route path="/footer" element={<Footer/>} />
         
    </Routes>
  );
}

export default App;
