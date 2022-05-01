import './index.css'
const index = ({size}:{size?: string}) => <div className={`lds-dual-ring ${size ? `after:w-${size} after:h-${size}` : 'after:w-14 after:h-14'}`}/>

export default index;