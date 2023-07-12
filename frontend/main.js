import 'regenerator-runtime';
import 'core-js/stable';
import Login from './modules/Login'

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

cadastro.init()
login.init()