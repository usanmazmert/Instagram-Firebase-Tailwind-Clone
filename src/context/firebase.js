import {createContext, useContext} from "react";

export const FirebaseContext = createContext()

 export const useGlobalContext = () => {
    return useContext(FirebaseContext)
 }