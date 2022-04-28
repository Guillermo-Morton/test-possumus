import { ContextValueInterface, useCharacters } from "../context/Characters.Provider";
const Pagination = () => {
    const {nextPage, previousPage, query, selectPage, page, loading } = useCharacters() as ContextValueInterface
    const numberOfPages = Math.ceil(query.records / 10) || 1
    const pages = Array.from(Array(numberOfPages).keys())
    const disablePrev = !numberOfPages || page===1
    const disableNext = !numberOfPages || page===numberOfPages

    const to = page > 1 ? (10 * (page-1) + query.length ): query.length
    const from = page === numberOfPages ? to - query.length: to - 10
    return (
        <div>
            {!loading && <p className="text-center text-xs">Showing from {from} to {to} entries</p>}
            <div className='w-full flex justify-center mt-2'>
                <button disabled={disablePrev} onClick={()=> previousPage()} className={`${disablePrev ? 'bg-slate-700 text-slate-400' : 'bg-slate-700 border-r border-slate-600 hover:bg-slate-300'} px-3 py-1 rounded-l-lg`}>Prev</button>
                {pages.map(e => (
                    <button key={e} onClick={()=> selectPage(e+1)} className={`${page === e+1 ? 'bg-slate-600' : 'bg-slate-700 '} border-r border-slate-600 py-1 px-2 hover:bg-slate-300`}>{e+1}</button>
                ))}
                <button disabled={disableNext} onClick={()=> nextPage()} className={`${disableNext ? 'bg-slate-700 text-slate-400' : 'bg-slate-700 hover:bg-slate-300'} px-3 py-1  rounded-r-lg`}>Next</button>
             </div>
        </div>
    );
};

export default Pagination;