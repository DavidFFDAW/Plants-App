import HttpService from './http.service.js';
import { apiURL } from '../constants/config';

const getFormDataPlantInfo = (plant) => {
    const frm = new FormData();
    frm.append("name", plant.name);
    frm.append("description", plant.description);
    frm.append("location", plant.location);
    frm.append("real_name", plant.real_name);
    frm.append("type", plant.type);
    frm.append("quantity", plant.quantity);
    frm.append("water_quantity", plant.waterQt);
    frm.append("extra_location", plant.extra_location);
    frm.append("file", plant.image);

    return frm;
}

export const getEmptyPlantObject = () => {
    return {
        name: '',
        real_name: '',
        description: '',
        location: '',
        extra_location: '',
        type: '',
        quantity: 1,
        water_quantity: '',
        image: '',
    }
}

export const paginate = (plants, limit, offset) => {
    const sliced = plants.slice(offset);
    sliced.length = limit;
    // const p = +page === 1 ? 0: page;
    return sliced;
}

export const getAllPlants = () => {
    return HttpService.get(`${apiURL}getPlants.php`)
}

export const getPlantsCustomURL = url => {
    return HttpService.get(url);
}

export const getPlantByID = (id) => {
    return HttpService.get(`${apiURL}getPlants.php?id=${id}`);
}

export const updatePlantById = (id, plant) => {
    const data = getFormDataPlantInfo(plant);
    return HttpService.post(`${apiURL}updatePlant.php?id=${id}`, data, false);
}

export const deletePlant = (id) => {
    return HttpService.delete(`${apiURL}deletePlant.php?id=${id}`)
}