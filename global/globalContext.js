import React, { useState } from 'react';

const GlobalContext = React.createContext(defaultValue);

const GlobalProvider = ({ children }) => {
    const [userTypeSignup, setUserTypeSignup] = useState('adopter');

    return (
        <GlobalContext.Provider value={{
            userTypeSignup,
            setUserTypeSignup
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

export { GlobalContext, GlobalProvider };