/* eslint-disable react/prop-types */
const AddAlbum = ({ onClose, onSubmit, newAlbumTitle, setNewAlbumTitle }) => {

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
      };
    
      return (
        <div className="fixed  inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="shadow-custom1 xl:w-1/3 lg:w-1/3 sm:w-1/2 w-full p-6 rounded shadow-md">
          <div className="flex justify-between mb-4">
            <span className="text-xl ">Add New Album</span>
            <button type="button" className="w-8 h-8" onClick={onClose}><img src="/close.png" alt="close" /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="New Album Title"
                value={newAlbumTitle}
                onChange={(e) => setNewAlbumTitle(e.target.value)}
                className="border p-2 mb-4 w-full text-black"
              />
              <div className="flex justify-end">
                <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-1 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white  px-4 py-1  rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    
    

export default AddAlbum;