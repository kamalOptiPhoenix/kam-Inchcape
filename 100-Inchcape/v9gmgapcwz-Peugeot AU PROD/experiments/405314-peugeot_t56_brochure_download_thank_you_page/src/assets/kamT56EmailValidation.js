function kamT56EmailValidation() {
    const input = document.querySelector('.t56EmailInput');
    const wrapper = document.querySelector('.t56EmailInputWrapper');
    if (wrapper) wrapper.classList.remove('t56errorShow');
    const mail = input ? input.value : '';
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regexEmail.test(mail)) return true;
    if (wrapper) wrapper.classList.add('t56errorShow');
    return false;
}

export default kamT56EmailValidation;
