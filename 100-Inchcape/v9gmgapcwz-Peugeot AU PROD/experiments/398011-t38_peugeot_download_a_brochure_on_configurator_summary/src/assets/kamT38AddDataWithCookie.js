/* eslint-disable no-console */
export default function kamT38AddDataWithCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
    console.log(`**** t38 Cookie Stored ${date.toUTCString()} ****`);
}
