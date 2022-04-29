import { useLocation } from "react-router-dom";
import { Character, useCharacters, ContextValueInterface } from "../context/Characters.Provider";
import { capitalize, subObject } from "../libraries/utils";
const ListFlatInfo = ({character} : Character) => {
 const keys = Object.keys(character)
 return (
     <div>
         {keys.map(key => (
             <h4 key={key} className="rounded-lg bg-slate-900 px-3 mx-2 my-1 flex justify-between"><span>{capitalize(key.replace('_',' '))}:</span><span>{character[key]}</span></h4>
         ))}
     </div>
 )
}
const ListArrayInfo = ({character, avoid}: Character) => {
    console.log('data', character)
    const {getExtraInfo} = useCharacters() as ContextValueInterface
    const keys = Object.keys(character)
    console.log('keys', keys)
    return (
        <div>
            {keys.map(key => {
               const URLs: Array<string> = character[key]
               if (!Array.isArray(URLs)) return null
               return (URLs.length > 0 ?
                    <div key={key} className="rounded-lg bg-slate-900 px-3 py-2 mx-2 my-1 flex  justify-between">
                        <h4>{capitalize(key.replace('_',' '))}</h4>
                        <button onClick={()=> getExtraInfo(URLs, key)} type="button" className="text-xs rounded-lg bg-slate-700 px-1 flex items-center">Expand</button>
                    </div> : null
                )
            })}
        </div>
    )
}
const Info = ({className}:{className: string}) => {
    const {state} : Character = useLocation()
    const flatInfo = {
        height: state.height/100 + 'm',
        mass: state.mass + 'kg',
        gender: capitalize(state.gender),
        eye_color: capitalize(state.eye_color),
        skin_color: capitalize(state.skin_color),
        birth_year: capitalize(state.birth_year),
    }
    const arrayInfo = subObject(['starships', 'vehicles', 'films'], state)
    // const propertiesToAvoid = ['created','edited','url']
    return (
        <div className={`${className}`}>
            <h1 className="text-xl text-center mb-3">{state.name}</h1>
            <ListFlatInfo character={flatInfo}/>
            <ListArrayInfo character={arrayInfo} avoid={[]}/>
        </div>
    );
};

export default Info;