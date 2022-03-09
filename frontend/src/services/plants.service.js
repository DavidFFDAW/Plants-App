import { get } from './http.service.js';
import { apiURL } from '../constants/config';

export const getAllPlants = () => {
    return get(`${apiURL}getPlants.php`)
}