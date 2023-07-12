const Contato = require('../models/contatoModel')

const index = async (req,  res) => {
    const contatos = await Contato.prototype.buscaContatos()
    .then((data) => {
       return res.render('index', {data});
    })
    .catch((e) => {
        console.log(e);
        return;
    })
    return;
}



module.exports = {
    index,
}