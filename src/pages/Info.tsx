import { useLocation } from "react-router-dom";
import { Character } from "../context/Characters.Provider";
import { capitalize } from "../libraries/utils";
const InfoList = ({character} : Character) => {
 const keys = Object.keys(character)
 console.log(keys)
 return (
     <div>
         {keys.map(key => (
             <p key={key} className="rounded-lg bg-slate-900 px-3 mx-2 my-1 flex justify-between"><span>{capitalize(key)}:</span><span>{character[key]}</span></p>
            //  <p key={key} className="rounded-lg bg-slate-900 px-3 mx-2 my-1">{`${capitalize(key)}: ${character[key]}`}</p>
         ))}
     </div>
 )
}
const Info = ({className}:{className: string}) => {
    const {state} : Character = useLocation()
    const infoToList = {
        height: state.height/100 + 'm',
        mass: state.mass + 'kg',
        gender: capitalize(state.gender)
    }
    console.log(state)
    return (
        <div className={`${className}`}>
            <h1 className="text-xl text-center mb-3">{state.name}</h1>
            {/* <div className="w-full flex justify-center">
                <span className="rounded-lg bg-slate-900 px-3 mx-2">{capitalize(state.gender)}</span>
                <span className="rounded-lg bg-slate-900 px-3 mx-2">{state.height/100}m</span>
                <span className="rounded-lg bg-slate-900 px-3 mx-2">{state.mass}kg</span>
            </div> */}
            <InfoList character={infoToList}/>
        </div>
    );
};

export default Info;