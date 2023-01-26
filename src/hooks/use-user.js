import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/firebase";
import { useUserContext } from "../context/UserContext";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
    const [activeUser, setActiveUser] = useState({})
    const {user} = useUserContext()

    useEffect(() => {
        async function getUserObjByUserId() {
            const response = await getUserByUserId(user.uid)
            setActiveUser(response)
        }
        if(user?.uid){
            getUserObjByUserId()
        }
    }, [user])
    return {user: activeUser}
}