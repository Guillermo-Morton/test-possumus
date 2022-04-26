import React, { useContext} from 'react';

const CharactersContext = React.createContext({})


export const useCharacters = () => {
    return useContext(CharactersContext)
}

interface ProviderInterface {
    children?: React.ReactNode;
    [key: string]: any;
  }

export const CharactersProvider: React.FC<ProviderInterface> = ({children}) => {
    
    return (
        <CharactersContext.Provider value={{}}>
            {children}
       </CharactersContext.Provider>
    );
};
