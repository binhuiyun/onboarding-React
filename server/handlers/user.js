const User = require('../models/user');

const findUserById = async (req, res ) => {
    try {
        console.log("ID", req.params.id);
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: 'Server Error'});
    }
};

const findAllUsers = async (req, res ) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {findUserById, findAllUsers};