import React from "react";
import { ContextValueInterface, useCharacters } from "../context/Characters.Provider";

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
        <form onSubmit={handleSubmit} className="w-full">
              <input defaultValue={search} onChange={e => e.target.value === '' && onSearch('')} placeholder="Search" name='search' autoComplete='off' className='w-full bg-slate-400 rounded-lg focus:outline-none px-3 py-1 text-slate-800 mb-4 placeholder:text-slate-500' type="text" />
        </form>
    );
};

export default SearchInput;