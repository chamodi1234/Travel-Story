// UserPage.jsx
import React, { useEffect, useState } from 'react';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TravelStory from '../components/TravelStory.jsx';

const UserPage = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    console.log('Stored Email:', storedEmail); 
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div>
      <Header />
      
      <div><TravelStory /></div>
      <Footer />
    </div>
  );
};

export default UserPage;
