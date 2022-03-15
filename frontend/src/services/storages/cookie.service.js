const getParsedCookies = _ => {
        return document.cookie.split(';').map(cookie => {
        const [key, value] = cookie.split('=');
        return { [key]: value };
    });
}

const save = (key,value) => {
    const d = new Date(); // today's date
    d.setDate(d.getDate() + 3); // will expire in three days
    const expires = d.toUTCString();
    document.cookie = `${key}=${value}; expires=${expires}; path=/;`
}

const get = (key) => {
    const cookies = getParsedCookies();
    return cookies[key] || null;
}

const remove = (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}


export default {
    save, get, remove
}