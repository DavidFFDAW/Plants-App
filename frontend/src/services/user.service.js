import HttpService from './http.service';
import { apiURL } from '../constants/config'; 

async function attemptLogIn ({ username, password }){
    const { token } = await HttpService.post(`${apiURL}login.php`, { email: username, password });
    return token;
}

export {
    attemptLogIn,
};