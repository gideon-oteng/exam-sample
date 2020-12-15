import Page from "../models/page";

class PageController {
    async getPage(req, res) {
        const isAdmin = req.session.loggedin ? true : false;

        const allPages = await Page.find({isAdminPage: isAdmin}, 'pageName pageCode path');

        let pageCode = req.query.pageCode ? req.query.pageCode : allPages[0].pageCode;
        const page = await Page.findOne({pageCode});

        // const a = 5;
        // `a = ${a}` === 'a = 5'
        // "a = ${a}"

        if (page.isAdminPage)
            return res.render(`pages/${page.pageCode}`, {
                pages: allPages,
                userPages: await Page.find({isAdminPage: false}, 'pageName pageCode'),
                page,
                isAdmin
            });

        return res.render('pages/page', {pages: allPages, page, isAdmin});
    }

    async postPage(req, res) {
        const isAdmin = req.session.loggedin ? true : false;

        await Page.create(req.body);

        return res.render('pages/addpage', {
            message: 'You have successfully created a new page!',
            pages: await Page.find({isAdminPage: isAdmin}, 'pageName pageCode path'),
            page: await Page.findOne({pageCode: 'addpage'}),
            isAdmin
        });
    }
}

export default PageController