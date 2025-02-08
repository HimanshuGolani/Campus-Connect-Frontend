import React, { useRef } from 'react'

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const wsRef = useRef(null);
    const contextValue = {
        wsRef
    }
    return (
        <AppContext.Provider value={contextValue} >
            {children}
        </AppContext.Provider>
    )
}

