export default function kamT38EmailValidation() {
    const mail = jQuery('.t38EmailInput').val();
    jQuery('.t38EmailInputWrapper').removeClass('t38errorShow');
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regexEmail.test(mail)) return true;
    jQuery('.t38EmailInputWrapper').addClass('t38errorShow');
    return false;
}
