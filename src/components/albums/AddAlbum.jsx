import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';

const AddAlbum = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingImageId, setEditingImageId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        setAlbums(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
        setLoading(false);
      });
  }, []);

  const deleteGrid = (imageId) => {
    setAlbums(albums.filter(album => album.id !== imageId));
  };

  const updateTitle = debounce((imageId, newTitle) => {
    setAlbums(albums.map(album => album.id === imageId ? { ...album, title: newTitle } : album));
    setEditingImageId(null);
  }, 3000); // Debounce with 2 second delay

  const handleEditClick = (image) => {
    setEditingImageId(image.id);
    setNewTitle(image.title);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setNewTitle(newTitle);
    updateTitle(editingImageId, newTitle);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    );
  }

  const userAlbums = albums.filter(album => album.userId === parseInt(userId, 10));

  return (
    <section className="bg-gray-950 h-screen text-white">
    <div className="p-4">
      <h2 className="text-xl flex mb-8 items-center justify-center shadow-custom1 py-0.5">User {userId} Albums</h2>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-8">
        {userAlbums.map(image => (
          <div key={image.id} className="relative flex flex-col shadow-2xl shadow-slate-500 border-none shadow-custom1 items-center rounded border mx-auto w-28 sm:w-40 lg:w-48 xl:w-52 h-32 sm:h-44 lg:h-52 xl:h-60 p-1 hover:show-buttons">
            <img src={`https://via.placeholder.com/200/23508720/FFFFFF?text=${image.title}`} className="mx-auto text-xl text-red-800" alt={image.title} />
            
            <h2 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"> {image.id}</h2>
            
            <button
              className="absolute bottom-0 left-0 bg-red-600 rounded text-white px-2 hidden"
              onClick={() => deleteGrid(image.id)}
            >
              X
            </button>
            
            <button
              className="absolute bottom-0 right-0 bg-blue-500 rounded text-white px-2 hidden"
              onClick={() => handleEditClick(image)}
            >
              Edit
            </button>
            
            {editingImageId === image.id && (
              <div className="absolute focus:ring-none bottom-4 left-1/2 transform -translate-x-1/2 bg-inherit p-2 shadow-md">
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  className="border p-1 text-black font-medium"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default AddAlbum;
