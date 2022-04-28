import React, { useContext , useEffect, useState} from 'react';
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
interface Response {
    count: number;
    next: string;
    previous: string;
    results: Array<Character>
    [key: string]: any;
}
export interface ContextValueInterface {
    characters: Array<{
        [key: string]: any;
    }>;
    setCharacters: Function;
    nextPage: Function;
    previousPage: Function;
    selectPage: Function;
    page: number;
    query: {records:number, length:number};
    loading: Boolean
}
export const CharactersProvider: React.FC<ProviderInterface> = ({children}) => {
    const [characters, setCharacters]= useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery]= useState({})
    const [page, setPage] = useState(1)
    const axios = require('axios')
    const nextPage= () => {
        setLoading(true)
        setTimeout(()=> {
            setPage(prevPage => prevPage + 1 )
        }, 2000)
    }
    const previousPage= () => {
        setLoading(true)
        setPage(prevPage => prevPage - 1 )
    }
    const selectPage= (page: number) => {
        setLoading(true)
        setPage(page)
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
    return (
        <CharactersContext.Provider value={{characters,setCharacters, previousPage, nextPage, query, selectPage, page, loading}}>
            {children}
       </CharactersContext.Provider>
    );
};
