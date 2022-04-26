import { useEffect, useState } from "react";
const PREFIX = 'messages-socket.io-'
const useLocalStorage = (key, initialValue) => {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(()=> {
        const jsonValue = JSON.parse(localStorage.getItem(prefixedKey))

        if(jsonValue !== null) return jsonValue
        
        if(initialValue === undefined) return null

        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(()=> {
      localStorage.setItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, value])

    return [value, setValue]
}
export default useLocalStorage