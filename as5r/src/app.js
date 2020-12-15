import path from 'path';
import express from 'express';
import session from 'express-session';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import pageRouter from './routes/page';
import authRouter, { AUTH_PREFIX } from './routes/auth';
import createInitData from "./models/initialData";

mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true, useUnifiedTopology: true });

createInitData().then(() => console.log('Initial data created'));

let app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.set('views', path.join(path.resolve(), 'src', 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(path.resolve(), 'src', 'public')));

app.use('/', pageRouter);
app.use(AUTH_PREFIX, authRouter);

export default app;
