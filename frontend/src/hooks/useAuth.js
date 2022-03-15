import { useContext, useCallback } from 'react';
import Context from './../context/UserContext';
import { attemptLogIn } from '../services/user.service';
import tokenService from '../services/token.service';


export default function useAuth() {

    const { token, setToken } = useContext(Context);

    const login = useCallback( (formData) => {
        attemptLogIn(formData)
            .then(jwt => {
                if(!jwt) return;
                tokenService.addToken(jwt);
                setToken(jwt);
            })
            .catch(err => {
                tokenService.removeToken();
                console.error(err.message);
            });
    }, [setToken]);

    const logout = useCallback( () => {
        tokenService.removeToken();
        setToken(null);
    }, [setToken]);    

    return {
        isLogged: Boolean(token),
        login,
        logout,
        token
    }
}