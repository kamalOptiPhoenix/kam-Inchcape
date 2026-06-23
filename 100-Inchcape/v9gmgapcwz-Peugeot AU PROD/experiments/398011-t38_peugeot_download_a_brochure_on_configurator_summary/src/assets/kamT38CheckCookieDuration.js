function kamT38GetCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
}

export default function kamT38CheckCookieDuration(name) {
    const value = kamT38GetCookie(name);
    if (value !== '') {
        return true;
    }
    return false;
}
