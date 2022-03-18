import React,{ useState } from 'react';
import TokenService from '../services/token.service';

const Context = React.createContext({});

export function UserContextProvider({ children }){

    const [token, setToken] = useState(
        () => TokenService.getToken()
    );

    return (<Context.Provider value={{ 
        token, setToken,
    }}>
        { children }
    </Context.Provider>);
}

export default Context;