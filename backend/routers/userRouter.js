const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();

const { generateToken } = require('../utils');

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await User.remove({})
        const createdUsers = await User.insertMany(data.users);
        res.send(createdUsers);
    })
);

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid user email or password' });
    })
);

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdUsers = await user.save();
        res.send({
            _id: createdUsers._id,
            name: createdUsers.name,
            email: createdUsers.email,
            isAdmin: createdUsers.isAdmin,
            token: generateToken(createdUsers),
        });
    })
);

module.exports = userRouter;
