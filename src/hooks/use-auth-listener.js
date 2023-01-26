import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/firebase";

export default function useAuthListener(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")))
    const {firebase} = useGlobalContext()

    useEffect(() => {
        const listener = onAuthStateChanged(getAuth(firebase), (authUser) => {

            if(authUser){
                localStorage.setItem("authUser", JSON.stringify(authUser))
                setUser(authUser)
            } else{
                localStorage.removeItem("authUser")
                setUser(null)
            }
        })

        return () => listener()
    }, [firebase])
    return {user}
}