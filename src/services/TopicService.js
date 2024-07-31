const Topic = require('../models/Topic');

exports.getAllByIds = async (topicIds) => {
    try {
        const topics = await Topic.find({ _id: { $in: topicIds } });
        return topics;
    } catch (error) {
        throw new Error('Error retrieving topics by IDs.');
    }
};
