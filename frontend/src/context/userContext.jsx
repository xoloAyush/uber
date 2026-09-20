import { useState, createContext, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {

    const [user, setUser] = useState({
        fullname:{
            firstname: "",
            lastname: ""
        },
        email: "",
        password: ""
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext
// export const useUser = () => useContext(UserContext);