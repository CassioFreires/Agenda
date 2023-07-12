import {
    event
} from "jquery";
import validator from "validator";


export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        this.verifica = null;
    }

    init() {
        this.events()
    }

    events() {

        if (!this.form) return;
        this.form.addEventListener('submit', (e) => {
            console.log('formulario enviado');
            e.preventDefault()
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const inputEmail = document.querySelector('input[name="email"]');
        const inputPassword = document.querySelector('input[name="password"]');

        if (inputEmail.value.length === 0 && inputPassword.value.length < 3 || inputPassword.value.length > 50) {
            return 
        }

        if (inputEmail.value.length === 0) {
            return 
        }
        if (inputPassword.value.length < 3 || inputPassword.value.length > 50) {
            return 
        }

        el.submit()

    }

}