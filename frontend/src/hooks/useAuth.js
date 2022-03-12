import { useContext, useCallback } from 'react';
import Context from './../context/UserContext';
import { attemptLogIn } from '../services/user.service';


export default function useAuth() {

    const { token, setToken } = useContext(Context);

    const login = useCallback( (formData) => {
        attemptLogIn(formData)
            .then(jwt => {
                if(!jwt) return;
                window.sessionStorage.setItem('token',jwt);
                setToken(jwt);
            })
            .catch(err => {
                window.sessionStorage.removeItem('token');
                console.error(err);
            });
    }, [setToken]);

    const logout = useCallback( () => {
        window.sessionStorage.removeItem('jwt');
        setToken(null);
    }, [setToken]);    

    return {
        isLogged: Boolean(token),
        login,
        logout,
        token
    }
}