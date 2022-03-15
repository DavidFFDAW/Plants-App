const getParsedCookies = _ => {
    return document.cookies.split(';').map(cookie => {
        const [key, value] = cookie.split('=');
        return { [key]: value };
    });
}

export const save = (key,item) => {
    const d = new Date(); // today's date
    d.setDate(d.getDate() + 3); // will expire in three days
    const expires = d.toUTCString();
    document.cookie = `${key}=${value}; expires=${expires}; path=/;`
}

export const get = (key) => {
    const cookies = getParsedCookies();
    return cookies[key] || null;
}

export const remove = (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}