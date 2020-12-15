import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    pageCode: {type: String},
    pageName: {type: String, required: true},
    content: {type: String, required: false},
    image: {type: String, required: false},
    isAdminPage: {type: Boolean, default: false},
    path: {type: String, required: false}
});

pageSchema.pre('save', function (next) {
    const page = this;
    // if (!page.isModified('pageName')) {
    //     return next();
    // }

    if (page.pageCode)
        page.pageCode = page.pageCode.toLowerCase();
    else {
        page.pageCode = page.pageName.toLowerCase().replace(/[\W_]+/g,'');
    }

    if (!page.path)
        page.path = `/?pageCode=${page.pageCode}`;

    next();
});

const Page = mongoose.model('Page', pageSchema);

export default Page;