import React from "react";
import { ContextValueInterface, useCharacters } from "../context/Characters.Provider";
import { FaSearch } from 'react-icons/fa';
interface FormElements extends HTMLFormControlsCollection {
    search: HTMLInputElement
  }

interface SearchFormElement extends HTMLFormElement {
readonly elements: FormElements
}

const SearchInput = () => {
    const {onSearch, search} = useCharacters() as ContextValueInterface
    const handleSubmit = (e: React.FormEvent<SearchFormElement>) => {
       e.preventDefault()
       onSearch(e.currentTarget.elements.search.value)
    }
    
    return (
        <form onSubmit={handleSubmit} className="w-full flex mb-4">
              <input defaultValue={search} onChange={e => e.target.value === '' && onSearch('')} placeholder="Search" name='search' autoComplete='off' className='w-full bg-slate-400 rounded-l-lg focus:outline-none px-3 py-1 text-slate-800  placeholder:text-slate-500' type="text" />
              <button type="submit" className="rounded-r-lg bg-slate-700 px-3 py-1"><FaSearch/></button>
        </form>
    );
};

export default SearchInput;