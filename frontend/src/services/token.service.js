import storage from './storages/cookie.service.js';
const tokenName = 'tokenJWT';

const addToken = token => {
    storage.save(tokenName, token)
}

const getToken = _ => {
    console.log(storage.get(tokenName));
    return storage.get(tokenName)
}

const removeToken = _ => {
    storage.remove(tokenName)
}

export default {
    addToken, getToken, removeToken
}