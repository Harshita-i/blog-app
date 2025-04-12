const exp = require('express');
const adminApp = exp.Router();
const Admin = require('../models/adminModel');
const UserAuthor = require('../models/userAuthorModel');
const Article = require('../models/articleModel');
const expressAsyncHandler = require("express-async-handler");

// // Middleware for Admin Authorization
// function adminAuth(req, res, next) {
//     const { email, password } = req.headers;

//     if (!email || !password) {
//         return res.status(403).send({ message: "Access Denied. No credentials provided." });
//     }

//     Admin.findOne({ email }).then(admin => {
//         if (admin && admin.password === password) {
//             next();  // Admin verified successfully
//         } else {
//             res.status(403).send({ message: "Unauthorized. Admin access required." });
//         }
//     }).catch(err => res.status(500).send({ message: "Internal server error." }));
// }

// Admin login
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin && admin.password === password) {
        res.send({ message: 'success', payload: admin });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
}));


// Add new admin
adminApp.post('/add-admin', expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(400).send({ message: 'Admin already exists' });
    }

    try {
        const newAdmin = new Admin({ firstName, lastName, email, password, role: 'admin' });
        await newAdmin.save();
        res.status(201).send({ message: 'Admin created successfully', payload: newAdmin });
    } catch (err) {
        res.status(400).send({ message: 'Error creating admin', error: err.message });
    }
}));


// Get all articles (Protected with Middleware)
adminApp.get('/articles', expressAsyncHandler(async (req, res) => {
    const articles = await Article.find();
    res.send({ message: 'success', payload: articles });
}));

// Get all users/authors (Protected with Middleware)
adminApp.get('/users-authors', expressAsyncHandler(async (req, res) => {
    const usersAuthors = await UserAuthor.find();
    res.send({ message: 'success', payload: usersAuthors });
}));

// Update user/author isActive status (Protected with Middleware)
adminApp.put('/users-authors/toggle', expressAsyncHandler(async (req, res) => {
    const { emails, isActive } = req.body;
   const result= await UserAuthor.updateMany(
        { email: { $in: emails } },
        {$set:{ isActive: isActive }}
    );
    console.log("result.modifiedCount")
    res.send({ message: 'success' });
}));

module.exports = adminApp;
