const Login = require('../models/loginModel');
const path = require('path')

const index = (req, res) => {
    if (req.session.user) return res.render('login-logado');
    return res.render('login');

}

const register = async (req, res, next) => {
    // ERRO -> CORRIGIR DPS

    try {
        const login = new Login(req.body);
        await login.register()
        
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save();
            return res.redirect('/login/index');
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save()
        return res.redirect('/login/index')
        res.send(login.errors)

    } catch (e) {
        console.log(e);
        return res.render('404')
    }


}

const login = async (req, res, next) => {
    try {
        const loginAcessado = new Login(req.body);
        await loginAcessado.login();

        if (loginAcessado.errors.length > 0) {
            req.flash('errors', loginAcessado.errors);
            req.session.save();
            return res.redirect('/login/index')
        }

        req.flash('success', 'Usuário logado com sucesso')
        req.session.user = loginAcessado.user;
        req.session.save()

        return res.redirect('/login/index')

    } catch (e) {
        console.log(e);
        return res.render('404')
    }

}

const logout = (req, res) => {
    res.redirect('/')
    req.session.destroy()
    console.log(req.session);

}

module.exports = {
    index,
    register,
    login,
    logout
}