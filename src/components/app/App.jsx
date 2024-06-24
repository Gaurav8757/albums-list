import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// App component fetches and displays a list of albums grouped by user ID.
const App = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch albums data when the component mounts
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
          // Set albums data to state and stop loading
        setAlbums(response.data);
        setLoading(false);
      })
      .catch(error => {
        // Handle error and stop loading
        console.error('Error fetching albums:', error);
        setLoading(false);
      });
  }, []);

   // Display a loading spinner while data is being fetched
  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-950">
    <div className="loader">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
</div>
</div>
;
  }

  return (
   <section className= "bg-gray-950 h-screen text-white">
    <div className="p-4">
      <h1 className="text-2xl flex mb-8 tems-center justify-center">Albums</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center">
        {/* Create Array using new Set FOR Albums group */}
        {/* Link redirect to array of selected userId album lists view */}
        {Array.from(new Set(albums.map(album => album.userId))).map(userId => (
          <Link
            key={userId}
            to={`/user/${userId}`}
            className="border group hover:text-2xl transition-all duration-500 h-32 sm:h-32 md:h-32 lg:h-52 xl:h-64 w-28 sm:w-32 md:w-32 lg:w-52 xl:w-64 flex justify-center  cursor-pointer aspect-w-1 aspect-h-1  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
            <h2 className="my-auto">Album {userId}
            <div className="bg-green-400 mt-1 h-[2px] w-0 group-hover:w-3/4 transition-all duration-500 shadow-custom"></div>
            </h2>  
          </Link>
        ))}
      </div>
    </div>
    </section>
  );
};

export default App;
