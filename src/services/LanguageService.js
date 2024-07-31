const Language = require('../models/Language');
const QuestionRecordMapper = require('../mappers/QuestionRecordMapper');

exports.getLanguageByIds = async (languageIds) => {
    try {
        const languages = await Language.find({ _id: { $in: languageIds } });
        return languages;
    } catch (error) {
        throw new Error('Error retrieving languages by IDs.');
    }
};

exports.getAllLanguages = async () => {
    try {
        const languages = await Language.find();
        const languageDTOList = QuestionRecordMapper.toLanguageDTOList(languages);
        return languageDTOList;
    } catch (error) {
        throw new Error('Error retrieving all languages.');
    }
};
