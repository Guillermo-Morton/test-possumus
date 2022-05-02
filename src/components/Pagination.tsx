import { ContextValueInterface, useCharacters } from "../context/Characters.Provider";
import { v4 as uuidv4 } from 'uuid';
const Pagination = ({marginPagesDisplayed} : {marginPagesDisplayed: number}) => {
    const {nextPage, previousPage, query, selectPage, page, loading } = useCharacters() as ContextValueInterface
    const numberOfPages = Math.ceil(query.records / 10) || 1
    const pages = Array.from(Array(numberOfPages).keys())
    const index = page - 1
    const startIndex = index-marginPagesDisplayed >= 0 ? index-marginPagesDisplayed : 0
    const finalIndex = index+marginPagesDisplayed+1
    
    // Showing margin mages only
    let dynamicPages: Array<{name:string|number, value:string|number}> = [...pages.slice(startIndex, finalIndex)].map(e => ({name:e+1, value:e+1}))

    // Handle showing the last page always
    if (!(page+marginPagesDisplayed >= numberOfPages-1)) {
        dynamicPages = [...dynamicPages,{name:'...', value: page + (marginPagesDisplayed + 1 )}, {name:numberOfPages, value:numberOfPages}]
    } 
    else if (!(page+marginPagesDisplayed >= numberOfPages)) {
        dynamicPages = [...dynamicPages, {name:numberOfPages, value:numberOfPages}]
    }

    // Handle showing the first page always
    if (index-marginPagesDisplayed > 1) {
        dynamicPages = [{name:1, value:1},{name:'...', value: page - (marginPagesDisplayed + 1 )}, ...dynamicPages]
    }
    else if (index-marginPagesDisplayed > 0){
        dynamicPages = [{name:1, value:1},...dynamicPages]
    }
    const disablePrev = !numberOfPages || page===1
    const disableNext = !numberOfPages || page===numberOfPages

    const to = page > 1 ? (10 * (page-1) + query.length ): query.length
    const from = (page === numberOfPages ? to - query.length: to - 10) + 1
    return (
        <div>
            {!loading && <p className="text-center text-xs">Showing from {from} to {to} entries</p>}
            <div className='w-full flex justify-center mt-2'>
                <button disabled={disablePrev} onClick={()=> disablePrev || previousPage()} className={`${disablePrev ? 'bg-slate-700 text-slate-400' : 'bg-slate-700 border-r border-slate-600 hover:bg-slate-300'} px-3 py-1 rounded-l-lg`}>Prev</button>
                {dynamicPages?.map(e => {
                        return (
                            <button key={uuidv4()} onClick={()=> selectPage(e.value)} className={`${page === e.name ? 'bg-slate-600' : 'bg-slate-700 '} border-r border-slate-600 py-1 px-2 hover:bg-slate-300`}>{e.name}</button>
                        )
                    
                })}
                <button disabled={disableNext} onClick={()=> disableNext || nextPage()} className={`${disableNext ? 'bg-slate-700 text-slate-400' : 'bg-slate-700 hover:bg-slate-300'} px-3 py-1  rounded-r-lg`}>Next</button>
             </div>
        </div>
    );
};

export default Pagination;