const express = require('express');
const app = express();
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController')
const {loginRequired} = require('./src/middlewares/middleware')

// rotas da home
route.get('/', homeController.index);

// rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// rota de contato
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register', contatoController.register)
route.get(`/contato/index/:id`, loginRequired, contatoController.editIndex)
route.post(`/contato/edit/:id`, loginRequired, contatoController.edit)
route.get('/contato/delete/:id', loginRequired, contatoController.excluir)

module.exports = route;