import { useContext, useCallback } from 'react';
import Context from './../context/UserContext';
import { attemptLogIn, attemptRegisterUser, } from '../services/user.service';


export default function useAuth() {

    const { token, setToken } = useContext(Context);

    const login = useCallback( ({ username, password }) => {
        attemptLogIn({username, password})
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

    // const register = useCallback( credentials => {
    //   if(credentials.password !== credentials.repeatPassword){
    //     alert('Las contraseñas no coinciden');
    //     return;
    //   }
    //   attemptRegisterUser(credentials).then(jwt => {
    //       SessionStorageService.addToken(jwt);
    //       setJWT(jwt);
    //   })
    // },[setJWT]);    

    return {
        isLogged: Boolean(jwt),
        login,
        logout,
        token
    }
}