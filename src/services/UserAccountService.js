const UserAccount = require('../models/UserAccount');

exports.getUserInfo = async (userDto) => {
    try {
        let user = await UserAccount.findOne({ sub: userDto.sub });
        if (!user) {
            user = new UserAccount({ sub: userDto.sub });
            await user.save();
        }
        return user;
    } catch (error) {
        throw new Error('Error retrieving user info.');
    }
};

exports.getByUserId = async (userId) => {
    try {
        const userAccount = await UserAccount.findById(userId);
        return userAccount;
    } catch (error) {
        throw new Error('Error retrieving user by ID.');
    }
};

exports.getByUserSub = async (sub) => {
    try {
        const userAccount = await UserAccount.findOne({ sub });
        return userAccount;
    } catch (error) {
        throw new Error('Error retrieving user by sub.');
    }
};
