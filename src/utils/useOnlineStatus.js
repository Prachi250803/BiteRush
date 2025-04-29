import { useEffect, useState } from "react"

const useOnlineStatus = () => {
    const [online, setOnline] = useState(true)
    useEffect(() => {
        window.addEventListener("offline",()=>{
            setOnline(true)
        })  
        window.addEventListener("online",()=>{
            setOnline(false)
        })

       
    },[])
    return online
}

export default useOnlineStatus