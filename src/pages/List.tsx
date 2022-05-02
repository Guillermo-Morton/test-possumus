import { useCharacters, ContextValueInterface } from "../context/Characters.Provider";
import Pagination from "../components/Pagination"
import { Link } from "react-router-dom";
import Loader from "../components/Loader"
import SearchInput from "../components/SearchInput";

const List = ({className}: {className: string}) => {
    const {characters, loading, selectCharacter} = useCharacters() as ContextValueInterface
    return (
        <section className={`${className}`}>
            <h2 className="text-lg text-center my-4">Characters</h2>
            <SearchInput/>
            <div className="flex-grow">
            {!loading ?
                (
                    characters.length ?  characters?.map(character => (
                        <div key={character.name} className="p-2 w-100 bg-slate-600 rounded-lg my-1 flex justify-between">
                            <p>{character.name}</p>
                            <Link onClick={()=> selectCharacter(character)} to='/info'  className="text-sm rounded-lg bg-slate-700 px-2 flex items-center">Details</Link>
                        </div>
                    ))  : <p className="text-center">No characters found</p>
                )
            :  
                <div className="w-full h-full flex justify-center items-center">
                    <Loader/>
                </div>
            }
            </div>
            <Pagination marginPagesDisplayed={1}/>
           
        </section>
    );
};
export default List;