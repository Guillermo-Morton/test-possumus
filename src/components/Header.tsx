import { Link, useLocation } from "react-router-dom";
const Header = () => {
    const location = useLocation()
    return (
        <div className="w-full bg-slate-800 p-4 absolute text-white flex justify-center items-center">
            {location.pathname !== '/' && <Link to='/' className="text-sm rounded-lg bg-slate-700 px-2 flex items-center absolute left-5">Back</Link>}
            <h2 className="text-xl">Swapi</h2>
        </div>
    );
};

export default Header