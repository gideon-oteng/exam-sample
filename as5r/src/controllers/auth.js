import bcrypt from 'bcryptjs';
import User from '../models/user';
import Page from "../models/page";

class AuthController {
    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    rememberUser(req, res, username) {
        req.session.loggedin = true;
        req.session.username = username;
    }

    forgetUser(req, res) {
        req.session.loggedin = false;
        delete req.session.username;
    }

    async getLoginForm(req, res) {
        const allPages = await Page.find({isAdminPage: req.session.loggedin ? true : false}, 'pageName pageCode path');

        return res.render('pages/login', {pages: allPages, page: {pageCode: 'login'}});
    }

    async login(req, res) {
        let {username, password} = req.body;
        const user = await User.findOne({username}).exec();

        if (user && bcrypt.compareSync(password, user.password)) {
            this.rememberUser(req, res, username);

            return res.redirect('/');
        }

        return res.render('pages/login', {
            errorMessage: "Wrong username or password",
            pages: await Page.find({isAdminPage: req.session.loggedin ? true : false}, 'pageName pageCode path'),
            page: {pageCode: 'login'}
        });
    }

    async logout(req, res) {
        this.forgetUser(req, res);

        return res.redirect('/');
    }
}

export default AuthController

