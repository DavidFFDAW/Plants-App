import HttpService from './http.service.js';
import { apiURL } from '../constants/config';

export const getAllPlants = () => {
    return HttpService.get(`${apiURL}getPlants.php`)
}

export const deletePlant = (id) => {
    return HttpService.delete(`${apiURL}deletePlant.php?id=${id}`)
}