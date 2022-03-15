export const save = (key,item) => {
    if (!key || !item) return;
    window.sessionStorage.setItem(key,item);
}

export const get = (key) => {
    return window.sessionStorage.getItem(key) || null;
}

export const remove = (key) => {
    window.sessionStorage.removeItem(key);
}

export default {
    save, get, remove
}