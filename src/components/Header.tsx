import { Link, useLocation } from "react-router-dom";
import { useCharacters, ContextValueInterface } from "../context/Characters.Provider";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
const Header = () => {
    const location = useLocation()
    const {character} = useCharacters() as ContextValueInterface
    return (
        <div className="w-full bg-slate-800 p-4 absolute text-white flex justify-center items-center">
            
            {location.pathname !== '/' && <Link to='/' className="text-sm rounded-lg bg-slate-700 p-2 flex items-center absolute left-5"><FaChevronLeft/></Link>}
            <h2 className="text-xl">Swapi</h2>
            {(location.pathname === '/' && character.name) && <Link to='/info' className="text-sm rounded-lg bg-slate-700 p-2 flex items-center absolute right-5"><FaChevronRight/></Link>}
        </div>
    );
};

export default Header