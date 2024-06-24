import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import AddAlbum from './AddAlbum.jsx';

const Album = () => {
  // Get userId from URL parameters
  const { userId } = useParams();

  // State to store albums, loading status, editing ID, new title, new album title, and popup 
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingImageId, setEditingImageId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  // Handle adding a new album
  const handleAddAlbum = () => {
    const newAlbum = {
      userId: parseInt(userId, 10),
      title: newAlbumTitle,
    };

    axios.post('https://jsonplaceholder.typicode.com/albums', newAlbum)
      .then(response => {
        setAlbums([...albums, response.data]);
        setNewAlbumTitle('');
        setIsPopupOpen(false);
      })
      .catch(error => {
        console.error('Error adding album:', error);
      });
  };

  // Fetch albums on component
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



  // Delete an album by its ID
  const deleteGrid = (imageId) => {
    setAlbums(albums.filter(album => album.id !== imageId));
  };

  // Update album title with debounce to limit API calls
  const updateTitle = debounce((imageId, newTitle) => {
    setAlbums(albums.map(album => album.id === imageId ? { ...album, title: newTitle } : album));
    setEditingImageId(null);
  }, 5000); // Debounce with 5 second delay

  // Handle the edit button click
  const handleEditClick = (image) => {
    setEditingImageId(image.id);
    setNewTitle(image.title);
  };

  // Handle changes to the album title input field
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setNewTitle(newTitle);
    updateTitle(editingImageId, newTitle);
  };


  // Display a loading spinner while data is being fetched
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
  // Filters albums to display only those belonging to the current userID
  const userAlbums = albums.filter(album => album.userId === parseInt(userId, 10));

  return (
    <section className="bg-gray-950 h-screen text-white">
      <div className="p-4 ">
        <h2 className="text-xl flex  items-center justify-center shadow-custom1 py-0.5">User {userId} Albums</h2>
        <div className="p-4 flex justify-end">
          {/* A button to open the add album popup */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-green-700 hover:bg-green-500 justify-end hover:text-black hover:font-semibold text-white px-4 py-2 font-semibold rounded mb-4">
            + Add Album
          </button>
        </div>
        {/*  */}
        {isPopupOpen && (
          <AddAlbum
            onClose={() => setIsPopupOpen(false)}
            onSubmit={handleAddAlbum}
            newAlbumTitle={newAlbumTitle}
            setNewAlbumTitle={setNewAlbumTitle}
          />
        )}
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-8">

          {/* A grid of albums with edit and delete buttons, and an input field for editing the title */}
          {userAlbums.map(image => (
            <div key={image.id} className="relative flex flex-col shadow-2xl shadow-slate-500 border-none shadow-custom1 items-center rounded border mx-auto w-28 sm:w-40 lg:w-48 xl:w-52 h-32 sm:h-44 lg:h-52 xl:h-60 p-1 hover:show-buttons">
              {/* Images placeholder to store text on image */}
              <img src={`https://via.placeholder.com/200/23508720/FFFFFF?text=${image.title}`} className="mx-auto text-xl text-red-800" alt={image.title} />

          {/* id of album use as image number*/}
              <h2 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"> {image.id}</h2>

              <button
                className="absolute bottom-0 left-0 bg-red-600 rounded text-white px-2 hidden"
                onClick={() => deleteGrid(image.id)}>
                X
              </button>

              <button
                className="absolute bottom-0 right-0 bg-blue-500 rounded text-white px-2 hidden"
                onClick={() => handleEditClick(image)}>
                Edit
              </button>

              {editingImageId === image.id && (
                <div className="absolute focus:ring-none bottom-4 left-1/2 transform -translate-x-1/2 bg-inherit p-2 shadow-md">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    className="border p-1 text-black font-medium" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Album;
