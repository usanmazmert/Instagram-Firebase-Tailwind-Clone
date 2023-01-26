import React, {createContext, useContext} from "react";

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext)
}

