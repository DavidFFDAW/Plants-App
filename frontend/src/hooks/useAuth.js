import { useContext, useCallback } from 'react';
import Context from './../context/UserContext';
import { attemptLogIn } from '../services/user.service';
import TokenService from '../services/token.service';


export default function useAuth() {

    const { token, setToken } = useContext(Context);

    const login = useCallback( (formData) => {
        attemptLogIn(formData)
            .then(jwt => {
                if(!jwt) return;
                TokenService.addToken(jwt);
                setToken(jwt);
            })
            .catch(err => {
                TokenService.removeToken();
                console.error(err.message);
            });
    }, [setToken]);

    const logout = useCallback( () => {
        TokenService.removeToken();
        setToken(null);
    }, [setToken]);    

    return {
        isLogged: Boolean(token),
        login,
        logout,
        token
    }
}