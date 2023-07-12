const Contato = require('../models/contatoModel');



const index = (req, res) => {
    res.render('contato', {data: {}})
}


const register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register()

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save();
            res.redirect('/contato/index')
            return
        }

        req.flash('success', 'Contato registrado com sucesso');
        req.session.save();
        res.redirect(`/contato/index/${contato.contato._id}`);
        return
    } catch (e) {
        res.render('404')
        console.log(e);
    }

}



const editIndex = async (req, res) => {

    if (!req.params.id) return res.render('404');

    const contato = new Contato(req.body);

    // capturando o objeto de cadastro pelo id
    const userContato = await contato.buscarPorId(req.params.id)
        .then((data) => {
            return res.render('contato', {
                data
            })
        })
        .catch((e) => {
            if (!userContato) return res.render('404');
        })


}

const edit = async (req, res) => {
    try {
        const contato = new Contato(req.body);

        if (!req.params.id) return res.render('404');

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save();
            res.redirect('/contato/index')
            return
        }


        await contato.edit(req.params.id);
        req.flash('success', 'Contato editado com sucesso');
        req.session.save();
        return res.redirect(`/contato/index/${req.params.id}`)
    } catch (e) {
        console.log(e);
        return res.render('404')
    }

}

const excluir = async(req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.prototype.delete(req.params.id);
    if(!contato) return res.render('404');

    req.flash('success', 'Contato excluído com sucesso');
    req.session.save();
    res.redirect(`/`)
    
}

module.exports = {
    index,
    register,
    editIndex,
    edit,
    excluir
}