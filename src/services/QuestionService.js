// src/services/questionService.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { QuestionRepository } = require('../repositories/questionRepository');
const { TopicService } = require('../services/topicService');
const { LanguageService } = require('../services/languageService');
const { QuestionRecordMapper } = require('../mappers/questionRecordMapper');

const tempDirectory = process.env.TEMP_DIR || os.tmpdir();
const bucketName = process.env.AWS_BUCKET_NAME;

const getAllQuestions = async () => {
  try {
    const questionDetails = await QuestionRepository.findAll();
    return questionDetails.map(question => QuestionRecordMapper.toAdminQuestionDetails(question));
  } catch (error) {
    console.error("Error in getAllQuestions:", error);
    throw error;
  }
};

const uploadInputFilesToS3 = async (questionId, inputFiles) => {
  let inputFileURLs = [];

  try {
    const question = await QuestionRepository.findById(questionId);
    if (!question) {
      throw new Error("Incorrect question id");
    }

    const uploadPromises = inputFiles.map(file => {
      const filePath = path.join(tempDirectory, uuidv4() + path.extname(file.originalname));
      const writeFileAsync = promisify(fs.writeFile);
      return writeFileAsync(filePath, file.buffer)
        .then(() => {
          const params = {
            Bucket: bucketName,
            Key: `${questionId}/${path.basename(filePath)}`,
            Body: fs.createReadStream(filePath)
          };
          return s3.upload(params).promise();
        })
        .then(data => {
          inputFileURLs.push(data.Location);
          fs.unlinkSync(filePath); // Clean up the file after upload
          return data.Location;
        });
    });

    await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error while file-upload:", error);
    throw error;
  }

  return inputFileURLs;
};

const saveQuestion = async (questionRequestRecord) => {
  try {
    const topics = await TopicService.getAllByIds(questionRequestRecord.topicIds);

    const languageTemplateMapping = questionRequestRecord.languageTemplates;
    const languageIds = Object.keys(languageTemplateMapping);
    const languages = await LanguageService.getLanguageByIds(languageIds);

    const questionLanguageTemplates = languages.map(language => ({
      language: language,
      template: languageTemplateMapping[language.id]
    }));

    const languageSolutionMap = questionRequestRecord.solutions;
    const newSolutions = languages.map(language => {
      const solutionRequestDTO = languageSolutionMap[language.id];
      return {
        solution: solutionRequestDTO.solution,
        language: language,
        complexity: solutionRequestDTO.complexity,
        explanation: solutionRequestDTO.explanation,
        optimization: solutionRequestDTO.optimization,
        createdAt: new Date()
      };
    });

    let question;
    if (questionRequestRecord.id) {
      question = await QuestionRepository.findById(questionRequestRecord.id);
      if (question) {
        Object.assign(question, {
          heading: questionRequestRecord.heading,
          difficulty: questionRequestRecord.difficulty,
          tier: questionRequestRecord.tier,
          solutionTier: questionRequestRecord.solutionTier,
          questionDescription: questionRequestRecord.questionDescription,
          datasetDescription: questionRequestRecord.datasetDescription,
          columnDefinition: questionRequestRecord.columnDefinition,
          active: questionRequestRecord.active,
          solutions: newSolutions,
          topics: topics,
          templates: questionLanguageTemplates
        });

        const inputFiles = questionRequestRecord.inputFilesS3URLS.map(path => ({
          question: question,
          path: path,
          createdAt: new Date()
        }));
        question.inputFiles = inputFiles;
      }
    } else {
      question = QuestionRecordMapper.toQuestion(questionRequestRecord);
      Object.assign(question, {
        topics: topics,
        solutions: newSolutions,
        templates: questionLanguageTemplates
      });
      await QuestionRepository.save(question);
    }

    return QuestionRecordMapper.toQuestionDTO(question);
  } catch (error) {
    console.error("Error in saveQuestion:", error);
    throw error;
  }
};

const deleteQuestionById = async (id) => {
  try {
    const question = await QuestionRepository.findById(id);
    if (question) {
      question.active = false;
      await QuestionRepository.save(question);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in deleteQuestionById:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await QuestionRepository.findById(id);
  } catch (error) {
    console.error("Error in getById:", error);
    throw error;
  }
};

const getQuestionDetailsById = async (questionId) => {
  try {
    const question = await QuestionRepository.findById(questionId);
    if (question) {
      return QuestionRecordMapper.toAdminQuestionDetails(question);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getQuestionDetailsById:", error);
    throw error;
  }
};

module.exports = {
  getAllQuestions,
  uploadInputFilesToS3,
  saveQuestion,
  deleteQuestionById,
  getById,
  getQuestionDetailsById
};
