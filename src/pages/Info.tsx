import { useNavigate } from "react-router-dom";
import { useCharacters, ContextValueInterface, FreePass } from "../context/Characters.Provider";
import { capitalize } from "../libraries/utils";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

// This is a component that use recursivity to render complex information from objects
const ListInfo = ({object, avoid, noArrays, noURLs, itemBg=800, level = 0, maxExpandLevel, index = 0, father= ''} : FreePass) => {

 const keys = Object.keys(object)

 const {getExtraInfo, extraInfo} = useCharacters() as ContextValueInterface
 const propertiesToAvoid = [...avoid]
 return (
     <div className={`bg-slate-${itemBg} sm:px-2 py-2 px-0 rounded-lg mx-0 my-2 sm:mx-1`}>
         {keys.map((key) => {
             // Avoid properties especified  
             if (avoid?.includes(key)) return null

             //  Multiple URLs information
             if(Array.isArray(object[key])){
                if(noArrays || level === maxExpandLevel) return null
                const URLs: Array<string> = object[key]
                const newKey= `${father.length ? father + '_' : '' }${key}${level}_${index}`
                return (URLs.length > 0 ?
                     <div key={uuidv4()} className="rounded-lg bg-slate-900 px-3 py-2 mx-2 my-1">
                         <div className="flex justify-between">
                            <h4>{capitalize(key.replaceAll('_',' '))}</h4>
                            <button onClick={()=> getExtraInfo({URLs: URLs.slice(0,3)}, newKey)} type="button" className="text-xs rounded-lg bg-slate-700 px-1 flex items-center">{extraInfo[newKey] ? 'Close': 'Expand'}</button>
                         </div>
                         {extraInfo[newKey] && extraInfo[newKey].map((item: FreePass, i : number) => (
                            <ListInfo
                              key={uuidv4()} 
                              object={item} 
                              level={level + 1} 
                              index={i} 
                              father={key.slice(0,4)}  
                              maxExpandLevel={maxExpandLevel} 
                              avoid={[...propertiesToAvoid, ]} 
                              itemBg={itemBg === 300 ? itemBg+500 : itemBg-100}/>
                         ))}
                     </div> : null
                 )
            }
            // Single URL information
            else if (isNaN(object[key]) && object[key].includes('https://')) {
                if (noURLs || level === maxExpandLevel) return null
                const newKey= `${father.length ? father + '_' : '' }${key}${level}`
                return (
                    <div key={uuidv4()}  className="rounded-lg bg-slate-900 px-3 py-2 mx-2 my-1">
                        <div className="flex justify-between">
                         <h4>{capitalize(key.replaceAll('_',' '))}</h4>
                         <button onClick={()=> getExtraInfo({url: object[key]}, newKey)} type="button" className="text-xs rounded-lg bg-slate-700 px-1 flex items-center">{extraInfo[newKey] ? 'Close': 'Expand'}</button>
                        </div>
                         {extraInfo[newKey] && <ListInfo
                              key={uuidv4()} 
                              object={extraInfo[newKey]} 
                              level={level + 1} 
                              father={key.slice(0,4)}  
                              maxExpandLevel={maxExpandLevel} 
                              avoid={[...propertiesToAvoid, ]} 
                              itemBg={itemBg === 300 ? itemBg+500 : itemBg-100}/>}
                     </div>
                )
            } 
            // Flat information
            else {
                return <h4 key={uuidv4()}  className="rounded-lg bg-slate-900 px-3 mx-2 my-1 flex justify-between"><span>{capitalize(key.replaceAll('_',' '))}:</span><span>{object[key]}</span></h4>
             }
         })}
     </div>
 )
}

const Info = ({className}:{className: string}) => {
    const {character} = useCharacters() as ContextValueInterface
    const navigate = useNavigate()
    useEffect(()=> {
        if(!character.name) navigate('/')
    },[])
    
    const info = {
        ...character,
        height: character.height/100 + 'm',
        mass: character.mass + 'kg',
    }
    const propertiesToAvoid = ['created','edited','url','opening_crawl', 'people']
    return (
        <div className={`${className} px-0 py-0`}>
            <h1 className="text-xl text-center mb-3">{character.name}</h1>
            <ListInfo object={info} avoid={propertiesToAvoid} maxExpandLevel={8} />
        </div>
    );
};

export default Info;