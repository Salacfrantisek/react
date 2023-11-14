import React, {createContext, useState} from "react";



const UserContext = createContext();
export function UserProvider({ children }) {
    const [ToggleAuth, setToggleAuth] = useState(true);

    const toggleAuthorization = () => {
        setToggleAuth((prev) => !prev);
        console.log(ToggleAuth);
    };

    return (
        <UserContext.Provider value={{ ToggleAuth, toggleAuthorization }}>
            {children}
        </UserContext.Provider>
    );
}


export default UserProvider;
