import HttpService from './http.service';
import { apiURL } from '../constants/config'; 

async function attemptLogIn (formData){
    const response = await HttpService.post(`${apiURL}login.php`, formData, false);
    return response.token;
}

export {
    attemptLogIn,
};