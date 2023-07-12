const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const LoginModel = mongoose.model('login_usuario', LoginSchema);

class Login {
    constructor(body) {
        this.body = body
        this.errors = [];
        this.user = null;
    }

    async register() {
        // Só vai registrar depois de validar
        this.validar()

        if (this.errors.length > 0) return;

        await this.usersExists();

        if (this.errors.length > 0) return;

        // criando hash de segurança para senha 
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body)
        console.log('usuario criado com sucesso no banco de dados');


    }

    async login() {
        // só vai logar dps de validar
        this.validar();
        
        if (this.errors.length > 0) return;

        this.user = await LoginModel.findOne({
            email: this.body.email
        });

        if (!this.user) {
            this.errors.push('Usuário não existe')
            this.user = null;
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            return;
        }


    }

    async usersExists() {
        this.user = await LoginModel.findOne({
            email: this.body.email,
        });
        if (this.user) {
            this.errors.push('Usuário já existente')
            console.log('usuario já existe no banco de dados')
        };

    }

    validar() {
        // Antes de validar vamos limpar os dados
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido.')
        }

        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha deve ter entre 3 e 50 caracteres')
        }

    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ' ';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }

    }
}

module.exports = Login;