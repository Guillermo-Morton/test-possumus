import React, { useContext , useEffect, useState} from 'react';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { subObject } from '../libraries/utils';
const CharactersContext = React.createContext({})


export const useCharacters = () => {
    return useContext(CharactersContext)
}

interface ProviderInterface {
    children?: React.ReactNode;
    [key: string]: any;
  }
export interface Character {
    [key: string]: any;
}
export interface FreePass {
        [key: string]: any;
}
interface Response {
    count: number;
    next: string;
    previous: string;
    results: Array<Character>
    [key: string]: any;
}
export interface ContextValueInterface {
    characters: Array<{
        [key: string]: any
    }>,
    setCharacters: Function,
    nextPage: Function;
    previousPage: Function;
    selectPage: Function,
    page: number,
    query: {records:number, length:number},
    loading: Boolean,
    extraInfo: FreePass,
    character: FreePass,
    getExtraInfo: Function,
    selectCharacter: Function
}
// interface keyInterface {
//     key: keyof typeof pages;
//     name: string;
// }

export const CharactersProvider: React.FC<ProviderInterface> = ({children}) => {
    const [characters, setCharacters]= useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery]= useState({records: 0, length:0})
    const [page, setPage] = useState(1)
    const [extraInfo, setExtraInfo] = useState({})
    const [character, setCharacter] = useState({})

    const axios = require('axios')

    const getExtraInfo = ({URLs, url} : {URLs: Array<string>, url: string}, name: string) => {
        const key = {
            index: name,
            property: name
        } as {
            index: keyof typeof extraInfo;
            property: string;
        }
        if(extraInfo[key.index]) {
            const newObject = subObject({object: extraInfo, avoid:[key.property]})
            setExtraInfo(newObject)
        } else {
            if(url) {
                axios.get(url)
                .then((response: Response) => {
                    // handle success
                    console.log(response.data)
                    setExtraInfo((prevExtraInfo: FreePass) => {
                        return ({...prevExtraInfo, [key.property]: response.data})
                    })
                })
                .catch((error : object) =>  {
                    // handle error
                    console.log(error);
                })
            }
            URLs?.forEach((url) => {
                axios.get(url)
                .then((response: Response) => {
                    // handle success
                    console.log(response.data)
                    setExtraInfo((prevExtraInfo: FreePass) => {
                        const prevArray : Array<FreePass> = prevExtraInfo[key.index]
                        
                        return ({...prevExtraInfo, [key.property]: (prevArray ? [...prevExtraInfo[key.index], response.data] : [response.data])})
                    })
                })
                .catch((error : object) =>  {
                    // handle error
                    console.log(error);
                })
            })
        }
    }
    const nextPage= () => {
        setLoading(true)
        setPage(prevPage => prevPage + 1 )
    }
    const previousPage= () => {
        setLoading(true)
        setPage(prevPage => prevPage - 1 )
    }
    const selectPage= (page: number) => {
        setLoading(true)
        setPage(page)
    }
    const selectCharacter = (character: Character) => {
        if(selectCharacter.name === character.name) return
       
        setCharacter((prevCharacter: Character)=> {
            if(prevCharacter.name !== character.name) {
                setExtraInfo({})
                return character
            } else {
                return prevCharacter
            }
        })
    }
    useEffect(()=> {
        console.log('DIDMOUNT')
        axios.get(`https://swapi.dev/api/people/?page=${page}`)
        .then((response: Response) => {
            // handle success
            console.log(response.data);
            setQuery({records: response.data.count, length: response.data.results.length})
            setCharacters(response.data.results)
        })
        .catch((error : object) =>  {
            // handle error
            console.log(error);
        })
        .then(() =>{
            // always executed
            setLoading(false)
        });
    },[page])

    const values:ContextValueInterface = {
        characters,
        setCharacters,
        previousPage, 
        nextPage, 
        query, 
        selectPage, 
        page, 
        loading, 
        extraInfo,
        getExtraInfo,
        character,
        selectCharacter
    }

    return (
        <CharactersContext.Provider value={values}>
            {children}
       </CharactersContext.Provider>
    );
};
