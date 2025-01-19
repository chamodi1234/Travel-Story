import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stories');
      setStories(response.data);
    } catch (err) {
      console.error('Error fetching stories:', err);
    }
  };

  const handleImageClick = (story) => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  return (
    <div>
      <Header />
      <div className="stories-page bg-dark text-light min-vh-100 py-5">
        <div className="container">
        <h1 
  className="text-center mb-5" 
  style={{
    fontFamily: "'Roboto Slab', serif", 
    fontWeight: '700', 
    fontStyle: 'italic', 
    color: '#333', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' // Optional text shadow for effect
  }}
>
  Travel Stories
</h1>


          {/* Stories Section */}
          <div className="row">
            {stories.map((story) => (
              <div key={story._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div
                  className="card bg-dark text-white border-light h-100"
                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  <img
                    src={`http://localhost:5000${story.imageUrl}`}
                    alt={story.title}
                    className="card-img-top"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                    }}
                    onClick={() => handleImageClick(story)}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{story.title}</h5>
                    <p className="card-text text-center text-truncate">
                      {story.description}
                    </p>
                    <p className="text-white text-center">({story.author})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Story Details */}
        {selectedStory && (
          <div
            className="modal fade show d-block"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
            onClick={handleCloseModal}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="modal-content bg-dark text-light border-light">
                <div className="modal-header">
                <h5 className="modal-title text-center w-100">{selectedStory.title}</h5>
                 
                </div>
                <div className="modal-body text-center">
                  <img
                    src={`http://localhost:5000${selectedStory.imageUrl}`}
                    alt={selectedStory.title}
                    className="img-fluid mb-3"
                    style={{
                      maxHeight: '400px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                  <p>{selectedStory.description}</p>
                  <p className="text-white">Author: {selectedStory.author}</p>
                </div>
                <div className="modal-footer d-flex justify-content-center w-100">
  <button
    type="button"
    className="btn btn-secondary"
    onClick={handleCloseModal}
  >
    Close
  </button>
</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StoriesPage;
