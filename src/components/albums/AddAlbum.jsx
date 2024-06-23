import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

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

  const updateTitle = (imageId, newTitle) => {
    setAlbums(albums.map(album => album.id === imageId ? { ...album, title: newTitle } : album));
    setEditingImageId(null);
  };

  if (loading) {
    return  <div className="flex items-center justify-center h-screen bg-gray-950">
    <div className="loader">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
</div>
</div>
;
  }

  const userAlbums = albums.filter(album => album.userId === parseInt(userId, 10));

  return (
    <section className= "bg-gray-950 h-screen text-white">
    <div className="p-4">
      <h2 className="text-2xl flex mb-8 tems-center justify-center">User {userId} Albums</h2>
      <div className="grid grid-cols-5 gap-4">
        {userAlbums.map(image => (
          <div key={image.id} className="relative  border p-2 ">
            <img src={`https://via.placeholder.com/150?text=${image.title}`} alt={image.title} />
            <h3>{image.title}</h3>
            <button
              className="absolute bottom-0 left-0 bg-red-600 rounded text-white px-2"
              onClick={() => deleteGrid(image.id)}
            >
              X
            </button>
            <button
              className="absolute bottom-0 right-0 bg-blue-500 rounded text-white px-2"
              onClick={() => setEditingImageId(image.id)}
            >
              Edit
            </button>
            {editingImageId === image.id && (
              <div className="absolute bottom-1 left-0 bg-transparent p-2 shadow-md">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border p-1 bg-transparent text-white"
                />
                <button
                  onClick={() => updateTitle(image.id, newTitle)}
                  className="bg-green-500 text-white px-2"
                >
                  Save
                </button>
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
