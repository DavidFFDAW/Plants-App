import storage from './storages/cookie.service.js';
const tokenName = 'tokenJWT';

const addToken = token => {
    storage.save(tokenName, token)
}

const getToken = _ => {
    storage.get(tokenName)
}

const removeToken = _ => {
    storage.remove(tokenName)
}

export default {
    addToken, getToken, removeToken
}