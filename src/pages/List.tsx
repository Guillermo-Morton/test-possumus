import { useCharacters, ContextValueInterface } from "../context/Characters.Provider";
import Pagination from "../components/Pagination"
import { Link } from "react-router-dom";

const List = ({className}: {className: string}) => {
    const {characters, loading} = useCharacters() as ContextValueInterface
    return (
        <section className={`${className}`}>
            <h2 className="text-xl text-center mb-5 mt-2">StarWars Characters</h2>
            <div className="flex-grow">
            {!loading ? characters?.map(character => (
                <div key={character.name} className="p-2 w-100 bg-slate-600 rounded-lg my-1 flex justify-between">
                    <p>{character.name}</p>
                    <Link to='/info' state={character} className="text-sm rounded-lg bg-slate-700 px-2">Details</Link>
                </div>
            )) : <p>Loading...</p>}
            </div>
            <Pagination/>
        </section>
    );
};
export default List;