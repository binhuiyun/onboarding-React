const User = require('../models/user');

const findUserById = async (req, res ) => {
    try {
        const user = await User.findById(req.params?.id);
        res.status(200).json(user);
    }catch{err}{
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {findUserById};