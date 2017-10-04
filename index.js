/**
 * Created by Administrator on 2017/8/5 0005.
 */
import path from 'path';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import config from 'config-lite';
import routes from './routes';
import pkg from './package';

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore(session)({
        url: config.mongodb
    })
}));
app.use(flash());

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.err = req.flash('error').toString();
    next();
});
routes(app);

app.listen(config.port, function () {
    console.log(`listening on port ${config.port}`)
});