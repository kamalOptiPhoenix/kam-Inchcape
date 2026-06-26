export default function kamT38EmailValidation() {
    const mail = document.querySelector('.t38EmailInput').value;
    document.querySelector('.t38EmailInputWrapper').classList.remove('t38errorShow');
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regexEmail.test(mail)) return true;
    document.querySelector('.t38EmailInputWrapper').classList.add('t38errorShow');
    return false;
}
