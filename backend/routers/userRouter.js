const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const data = require('../data');

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await User.remove({})
        const createdUsers = await User.insertMany(data.users);
        res.send(createdUsers);
    })
);

module.exports = userRouter;
