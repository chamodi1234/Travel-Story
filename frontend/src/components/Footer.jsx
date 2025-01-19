import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333333', color: '#ffffff' }} className="py-1">
      <div className='container'>
        <div className='row'>
          {/* Travel Theme Section */}
          <div className='col-md-4 text-center mb-3'>
            <h5 className='fw-bold mb-2'>Travel Story App</h5>
            <p>Explore the world through shared travel experiences. Join the community and start your journey today!</p>
          </div>

          {/* Social Media Icons Section */}
          <div className='col-md-4 text-center mb-3'>
            <h5 className='fw-bold mb-2'>Follow Us</h5>
            <div className='social-icons'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white me-3 fs-3'
              >
                <i className='fab fa-facebook'></i>
              </a>
              <a
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white fs-3'
              >
                <i className='fab fa-youtube'></i>
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className='col-md-4 text-center mb-3'>
            <p></p>
            <p className='mb-0'>
              &copy; {new Date().getFullYear()} Chamodi Chethana. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
