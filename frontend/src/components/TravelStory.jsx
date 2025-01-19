import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TravelStory = () => {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ title: '', image: null, description: '', author: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await axios.get('http://localhost:5000/api/stories', {
        params: { author: userEmail }, // Send author as a query parameter
      });
      setStories(response.data);
    } catch (err) {
      console.error('Error fetching stories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });

    if (name === 'image' && files) {
      setCurrentImage(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.author || (editingId && !form.image && !currentImage)) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    if (form.image) {
      formData.append('image', form.image);
    }
    formData.append('description', form.description);
    formData.append('author', localStorage.getItem('userEmail'));  // Include the logged-in user's email

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/stories/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/stories', formData);
      }

      setForm({ title: '', image: null, description: '', author: '' });
      setCurrentImage(null);
      fetchStories();
    } catch (err) {
      console.error('Error saving story:', err);
    }
  };

  const handleEdit = (story) => {
    setEditingId(story._id);
    setForm({
      title: story.title,
      image: null,
      description: story.description,
      author: story.author,
    });
    setCurrentImage(`http://localhost:5000${story.imageUrl}`);
  };

  const handleDeleteImage = async () => {
    if (editingId && currentImage) {
      try {
        console.log('Deleting image for story with id:', editingId);
        const imageUrl = currentImage.replace('http://localhost:5000', ''); // Correct the URL
        await axios.delete(`http://localhost:5000/api/stories/${editingId}/delete-image`, { data: { imageUrl } });
        setCurrentImage(null);
        setForm({ ...form, image: null });
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }
  };
  
  const handleDelete = async (id, imageUrl) => {
    try {
      await axios.delete(`http://localhost:5000/api/stories/${id}`, { data: { imageUrl } });
      fetchStories();
    } catch (err) {
      console.error('Error deleting story:', err);
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center mb-5">Travel Stories</h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-dark text-white p-4 rounded mb-5 border border-light">
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="form-control bg-secondary text-light border-light"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={form.author}
              onChange={handleChange}
              className="form-control bg-secondary text-light border-light"
            />
          </div>
          <div className="mb-3">
            {currentImage && (
              <div className="position-relative">
                <img
                  src={currentImage}
                  alt="Preview"
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="btn btn-secondary btn-sm position-absolute top-0 end-0"
                >
                  ✕
                </button>
              </div>
            )}
            {!currentImage && (
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="form-control bg-secondary text-light border-light"
              />
            )}
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="form-control bg-secondary text-light border-light"
              rows="4"
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100">
            {editingId ? 'Update Story' : 'Add Story'}
          </button>
        </form>

        {/* Story List */}
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
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img
                  src={`http://localhost:5000${story.imageUrl}`}
                  alt={story.title}
                  className="card-img-top"
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{story.title}</h5>
                  <p className="card-text text-center">{story.description}</p>
                  <p className="text-white text-center">({story.author})</p>
                  <div className="d-flex justify-content-between mt-auto">
                  <button
  className="btn btn-lg"
  style={{
    backgroundColor: '#6c757d', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderColor: '#6c757d', 
    color:"white"
  }}
  onClick={() => handleEdit(story)}
>
  Edit
</button>

<button
  className="btn btn-lg"
  style={{
    backgroundColor: '#6c757d', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    borderColor: '#6c757d', 
    color:'white'
  }}
  onClick={() => handleDelete(story._id, story.imageUrl)}
>
  Delete
</button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStory;
