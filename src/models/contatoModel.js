const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
  });

const ContatoModel = mongoose.model('contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.contato = null;
        this.errors = [];
    }



    register = async () => {
        this.valida()

        // verificando se há algum erro
        if (this.errors.length > 0) return;

        // criando usuario no banco de dados
        this.contato = await ContatoModel.create(this.body)
       

    }

    valida = async () => {
        this.cleanUp();

         // Validação
        // O e-mail precisa ser válido
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
        if (!this.body.email && !this.body.telefone) {
            this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
        }

    }
    cleanUp = () => {
        for (let key in this.body) {
            if (this.body[key] !== 'string') {
                return this.body[key] == '';
            }
            this.body = {
                nome: this.body.nome,
                sobrenome: this.body.sobrenome,
                email: this.body.email,
                telefone: this.body.telefone,
            }
        }

    }

    async edit (id){
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true });
    }

    async buscarPorId(id) {
        if(typeof id !== 'string') return;
        const user = await ContatoModel.findById(id)
        return user;
    }

    async buscaContatos () {
        const contato = await ContatoModel.find().sort({criadoEm: -1});
        return contato;
    }

    async delete(id) {
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete({_id: id})
        return contato;
    }
}

module.exports = Contato;