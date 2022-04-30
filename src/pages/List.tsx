import { useCharacters, ContextValueInterface } from "../context/Characters.Provider";
import Pagination from "../components/Pagination"
import { Link } from "react-router-dom";
import Loader from "../components/Loader"
import { useEffect } from "react";

const List = ({className}: {className: string}) => {
    const {characters, loading, selectCharacter} = useCharacters() as ContextValueInterface
    return (
        <section className={`${className}`}>
            <h2 className="text-lg text-center mb-5 mt-2">Characters</h2>
            <div className="flex-grow">
            {!loading ? characters?.map(character => (
                <div key={character.name} className="p-2 w-100 bg-slate-600 rounded-lg my-1 flex justify-between">
                    <p>{character.name}</p>
                    <Link onClick={()=> selectCharacter(character)} to='/info'  className="text-sm rounded-lg bg-slate-700 px-2 flex items-center">Details</Link>
                </div>
            )) :  
                <div className="w-full h-full flex justify-center items-center">
                    <Loader/>
                </div>
            }
            </div>
            <Pagination/>
           
        </section>
    );
};
export default List;