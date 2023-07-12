// express para trabalhar com rotas - URLs
const express = require('express');
const porta = 8081;
const app = express();
// path trabalhar com caminhos do sistema local
const path = require('path');
// mongoose para trabalhar com banco de dados 
const mongoose = require('mongoose');
// session / connect-mongo / connect-flash -> gerenciar seção 
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
// helmet para gerenciar previnir ataques de usuarios
const helmet = require('helmet');
const csrf = require('csurf');
// rotas
const rotas = require('./routes')
// middlewares
const {checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');

// config helmet no express
// app.use(helmet());

// config servidor do mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/agenda')
    .then(() => {
        console.log('Conectado no mongoDB');
        app.emit('pronto')
    })
    .catch((e) => console.log('Falha ao tentar conectar ao banco de dados'));

// config pasta public
app.use(express.static(path.resolve(__dirname, 'public')));
console.log(path.resolve(__dirname, 'public'));

// config views ejs
app.set('views', path.resolve(__dirname,  'src', 'views'));
app.set('view engine', 'ejs')

// config middleware para pegar o post do form
app.use(express.urlencoded({
    extended: true
}));


// config session
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/agenda',
        ttl: 14 * 24 * 60 * 60
    }),
    secret: 'asdlkjasld',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 14 * 24 * 60 * 60,
        httpOnly: true
    }
}))
app.use(flash());

//config token de segurança do form 
app.use(csrf());

// usando o middleware 
app.use(checkCsrfError)
app.use(csrfMiddleware)

// configurações das rotas
app.use(rotas)

app.on('pronto', () => {
    app.listen(porta || 3000, () => {
        console.log('Servidor rodando com sucesso')
    });
})