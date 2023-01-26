import React from 'react'
import { FirebaseContext } from '../context/firebase'

const ContextProvider = ({children, value}) => {
  return (
    <FirebaseContext.Provider value={value}>
        {children}
    </FirebaseContext.Provider>
  )
}

export default ContextProvider