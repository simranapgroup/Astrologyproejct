import React from 'react';
import '../css/Experience.css';
import treeBackground from '../Images/tree.png';


const generations = [
  {
    title: "First Generation",
    name: "Pandit Rajguru Balabaksh Pareek",
    description: "The revered founder of our astrological lineage, Pandit Rajguru Balabaksh Pareek Ji possessed extraordinary divine vision in Vedic astrology and palmistry. Despite physical blindness, his spiritual insight illuminated the paths of countless souls seeking guidance through the cosmic sciences.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
  },
  {
    title: "Second Generation", 
    name: "Pandit Vishnu Pareek",
    description: "Carrying forward the sacred knowledge with profound dedication, Pandit Vishnu Pareek mastered the ancient arts of horoscope reading, gemstone consultation, and planetary remedies. His deep understanding of Vedic scriptures guided many through life's celestial influences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    title: "Third Generation",
    name: "Acharya Ramesh Pareek", 
    description: "A learned scholar who expanded our family's wisdom by integrating traditional astrological practices with detailed birth chart analysis, vastu consultation, and spiritual healing. His expertise in muhurat selection and remedial measures brought prosperity to many families.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    title: "Fourth Generation",
    name: "Pandit Suresh Pareek",
    description: "The current torchbearer of our ancestral wisdom, combining time-honored Vedic knowledge with modern consultation methods. Specializing in career guidance, marriage compatibility, health predictions, and providing practical solutions for contemporary life challenges through ancient astrological sciences.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face"
  }
];

const ExperienceSection = () => {
  return (
    <div
  className="experience-section"
  style={{ backgroundImage: `url(${treeBackground})` }}
>

    
      <div className="background-elements"></div>

      <div className="experience-container">
       
        <div className="experience-header">
          <div className="header-icon">
            
          </div>
          
          <h1 className="header-title">
            <span className="header-number">4</span>
            Generations of
            <span className="header-highlight">Divine Wisdom</span>
          </h1>
          
          <p className="header-description">
            "Discover the celestial journey of the Pareek family legacy - Four generations dedicated to unlocking the mysteries of the cosmos and guiding souls through the ancient science of astrology"
          </p>
          
          <button className="header-button">
            Explore Our Legacy
          </button>
        </div>

    
        <h2 className="generation-heading">
          Our Astrological Lineage
        </h2>

      
        <div className="generation-cards">
          {generations.map((gen, index) => (
            <div key={index} className="generation-card">
            
              <div className="card-image-container">
                <img
                  src={gen.image}
                  alt={gen.name}
                  className="card-image"
                />
                
  
                <div className="generation-number">
                  {index + 1}
                </div>
              </div>

             
              <div className="card-content">
                <div className="card-badge">
                  {gen.title}
                </div>
                
                <h3 className="card-title">
                  {gen.name}
                </h3>
                
                <p className="card-description">
                  {gen.description}
                </p>
                
                <button className="card-button">
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;