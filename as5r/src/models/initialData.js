import User from './user';
import Page from './page';

export default async function createInitData() {
    if ((await User.find()).length === 0) {
        await User.create({
            username: 'admin',
            email: 'admin@test.ca',
            password: '123456'
        });
    }

    if ((await Page.find()).length === 0) {
        const pages = [
            {
                pageCode: 'home',
                pageName: 'Home',
                content: 'homepage'
            },
            {
                pageCode: 'about',
                pageName: 'About',
                content: 'about'
            },
            {
                pageCode: 'team',
                pageName: 'Team',
                content: 'team'
            },
            {
                pageCode: 'contact',
                pageName: 'Contact',
                content: 'contact'
            },
            {
                pageCode: 'addpage',
                pageName: 'Add Page',
                isAdminPage: true
            },
            {
                pageCode: 'editpages',
                pageName: 'Edit Pages',
                isAdminPage: true
            },
            {
                pageCode: 'editheader',
                pageName: 'Edit Header',
                isAdminPage: true
            },
            {
                pageCode: 'logout',
                pageName: 'Logout',
                path: '/auth/logout',
                isAdminPage: true
            }
        ];

        for (let p of pages) {
            await Page.create(p);
        }
    }
}