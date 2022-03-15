import storage from './storages/cookie.service.js';
const tokenName = 'tokenJWT';

export const addToken = token => {
    storage.save(tokenName, token)
}

export const getToken = _ => {
    storage.get(tokenName)
}

export const removeToken = _ => {
    storage.remove(tokenName)
}