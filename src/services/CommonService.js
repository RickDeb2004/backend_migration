const Topic = require('../models/Topic');

exports.getAllTopics = async () => {
    try {
        return await Topic.find();
    } catch (error) {
        throw new Error('Error retrieving topics.');
    }
};
