import React from 'react';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
  return (
    <div>
      <Header />

      <div style={styles.container} className="d-flex flex-column">
        <div style={styles.blackBox}>
          <div className="container text-center text-light py-5" style={styles.hero}>
            <div className="row justify-content-center">
              <div className="col-12">
              <h1 className="display-4 text-center my-4">
  <marquee
    behavior="scroll"
    direction="left"
    scrollamount="10"
    style={{
      
      
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      fontSize: '4rem',
    }}
  >
    Welcome to Travel Story App
  </marquee>
</h1>

              </div>
              <div className="col-md-8">
                
              </div>
            </div>

          

<div className="row justify-content-center text-center py-5">
  <div className="col-lg-5 col-md-7">
    <p
      className="text-white py-3 mb-2"
      style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1.8rem',
        lineHeight: '1.5',
      }}
    >
      Ready to embark on a journey? Explore captivating travel stories from
      fellow adventurers and share your own experiences. Click the button
      below to start discovering amazing travel stories!
    </p>
    <a
      href="/stories"
      className="btn btn-lg me-3"
      style={{
        
        fontWeight: 'bold',
        backgroundColor: '#000', 
    color: '#fff', 
    border: 'none', 
    padding: '10px 30px', 
    fontSize: '1.2rem', 
    transition: 'background-color 0.3s ease',
    boxShadow: '0 7px 10px rgba(241, 251, 255, 0.27)', 
    borderRadius: '5px', 
      }
    
    }

  
    >
      Explore Stories
    </a>
  </div>
</div>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(/images/home.jpg)',
  },

  blackBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    borderRadius: '8px', 
    padding: '40px 20px', 
    minHeight: '80vh' ,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
  },


 
  
};

export default Home;
