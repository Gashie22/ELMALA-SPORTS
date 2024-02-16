const mongoose = require('mongoose')
const userSchema = require('../model/users')


//auth restriction
exports.isLocked = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.render('Users/modal');
    }
}

exports.Homepage = async (req, res) => {
    //allow the flash message to be displayed in the home function which renders the inde.ejs
    //const msg = await req.consumeFlash('info')
    const locals = {
        name: "Clients",
        level: "beginner"
    }
    //pagination
    let perPage = 6;
    let page = req.query.page || 1;


    try {
        const Users = await userSchema.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await userSchema.countDocuments({});

        res.render('index', {
            locals, Users,
            current: page,
            pages: Math.ceil(count / perPage)
        })



    } catch (err) {
        console.log(err)
    }
};

exports.AddUser = async (req, res) => {
    const locals = {
        name: "Client",
        surname: "Masosonore"
    }
    res.render('Users/addUser', locals)
}
exports.PostUser = async (req, res) => {

    console.log(req.body)
    //generating customer object

    const newUsers = new userSchema({
        CompanyName: req.body.CompanyName,
        Representative: req.body.Representative,
        CallorMeeting: req.body.CallorMeeting,
        Details: req.body.Details,
        Telephone: req.body.Telephone,
        Email: req.body.Email,
        Status: req.body.Status,
        NeworExisting: req.body.NeworExisting,
        Currency: req.body.Currency,
        Date: Date.now()
    })
    try {
        await userSchema.create(newUsers)
        //flash card
        //  await req.flash('info', 'New user added')
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
}

exports.edit = async (req, res) => {
    try {
        const customer = await userSchema.findOne({ _id: req.params.id });

        const locals = {
            title: "Edit Client",
            description: "Free NodeJs User Management System",
        };

        res.render("Users/editUser", {
            locals,
            customer,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.editPost = async (req, res) => {
    try {
        await userSchema.findByIdAndUpdate(req.params.id, {
            CompanyName: req.body.CompanyName,
            Representative: req.body.Representative,
            CallorMeeting: req.body.CallorMeeting,
            Details: req.body.Details,
            Telephone: req.body.Telephone,
            Email: req.body.Email,
            Status: req.body.Status,
            NeworExisting: req.body.NeworExisting,
            Currency: req.body.Currency,
            Date: Date.now()
        });
        await res.redirect(`/edit/${req.params.id}`);

        console.log("redirected");
    } catch (error) {
        console.log(error);
    }
};

exports.ViewUser = async (req, res) => {
    try {

        const user = await userSchema.findOne({ _id: req.params.id }) //grabing the id url as a parameter

        const locals = {
            name: "View Customer",
            surname: "User details"
        }
        res.render('Users/viewUser', { locals, user })

    } catch (err) {
        console.log(err)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await userSchema.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')


    } catch (err) {
        console.log(err)
    }
}
exports.searchUser = async (req, res) => {
    try {
        const locals = {
            title: 'Search',
            description: 'We can use this to search for a user'
        }
        let searchItem = req.body.searchTerm
        const searchChar = searchItem.replace(/[^a-zA-Z0-9 ]/g, "");

        const users = await userSchema.find({
            $or: [
                { CompanyName: { $regex: new RegExp(searchChar, "i") } },
                { Representative: { $regex: new RegExp(searchChar, "i") } },
                { Email: { $regex: new RegExp(searchChar, "i") } },
            ],
        });

        res.render('Users/search', { locals, users })


    } catch (err) {
        console.log(err)
    }
}

exports.aboutUser = async (req, res) => {
    //allow the flash message to be displayed in the home function which renders the inde.ejs
    //const msg = await req.consumeFlash('info')
    const locals = {
        name: "About Us",
        level: "beginner"
    }


    try {

        res.render('Users/about',
            locals)



    } catch (err) {
        console.log(err)
    }
};
exports.clients = async (req, res) => {
    try {
        const locals = {
            title: "Clients",
            level: "beginner"
        }
        //pagination
        let perPage = 6;
        let page = req.query.page || 1;

        const Users = await userSchema.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await userSchema.countDocuments({});

        res.render('Users/clients', {
            locals, Users,
            current: page,
            pages: Math.ceil(count / perPage)
        })
    } catch (error) {
        console.log(error);
    }
};
