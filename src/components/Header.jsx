import { Link } from "react-router-dom";
import NetworkStatus from "./network/NetworkStatus.jsx";
const Header = () => {
    return (
        <header className="sticky top-0 p-4 bg-gradient-to-r from-cyan-950 to-blue-900 text-white flex xl:justify-between justify-evenly items-center"> 
            <Link to={`/`} className="flex my-auto  justify-center">
            <img src= "/gallery.png" className="h-8 w-8 mr-3" alt="logo" />
            <h1 className="text-xl font-mono font-bold content-center uppercase">Albums List</h1>
            </Link>   
            <NetworkStatus/>
        </header>
    );
};

export default Header;
