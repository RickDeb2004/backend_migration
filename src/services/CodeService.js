const { URL } = require('url');
const axios = require('axios');
const { Question } = require('../models/Question');
const { AwsS3Service } = require('./AwsS3Service');

const region = process.env.AWS_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const accessSecret = process.env.AWS_SECRET_ACCESS_KEY;
const livyUrl = process.env.LIVY_URL;

exports.executeCode = async (codeDTO) => {
    try {
        const sessionId = await getAvailableSessionId() || await createNewSession();

        let codeBuilder = codeDTO.code;

        const question = await Question.findById(codeDTO.questionId);
        if (question) {
            const inputFiles = question.inputFiles.map(file => file.path).join(',');
            codeBuilder += `\ndataset = spark.read.csv('${inputFiles}',  header='true')\n\nspark_etl(dataset)`;
        }

        const statement = {
            code: codeBuilder,
            kind: codeDTO.codeLanguage
        };
        const codeExecutionURL = new URL(`/sessions/${sessionId}/statements`, livyUrl).toString();
        console.log(`execute-code-url: ${codeExecutionURL}, request: ${JSON.stringify(statement)}`);

        const response = await axios.post(codeExecutionURL, statement);
        const statementResponse = response.data;

        return await getCodeOutput(sessionId, statementResponse.id);
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAvailableSessionId = async () => {
    try {
        const url = new URL('/sessions', livyUrl).toString();
        console.log(`get-available-sessions: ${url}`);

        const response = await axios.get(url);
        const sessionInfo = response.data;

        for (const session of sessionInfo.sessions) {
            if (session.state.toLowerCase() === 'idle') {
                return session.id;
            }
        }
        return null;
    } catch (error) {
        throw new Error(`Error while fetching sessions: ${error.message}`);
    }
};

const createNewSession = async () => {
    try {
        const url = new URL('/sessions', livyUrl).toString();
        console.log(`create-new-session: ${url}`);

        const newSessionRequest = {
            driverCores: 1,
            driverMemory: '512M',
            executorCores: 1,
            executorMemory: '512M',
            numExecutors: 1
        };

        const response = await axios.post(url, newSessionRequest);
        const session = response.data;

        return await waitForSessionToStart(session.id);
    } catch (error) {
        throw new Error(`Error while creating new session: ${error.message}`);
    }
};

const waitForSessionToStart = async (sessionId) => {
    try {
        const url = new URL(`/sessions/${sessionId}/state`, livyUrl).toString();
        console.log(`wait-for-session-to-start: ${url}`);

        for (let i = 0; i < 10; i++) {
            const response = await axios.get(url);
            const session = response.data;

            if (session.state.toLowerCase() === 'idle') {
                return sessionId;
            }

            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
        }

        throw new Error('Session did not start within the expected time.');
    } catch (error) {
        throw new Error(`Error while waiting for session to start: ${error.message}`);
    }
};

const getCodeOutput = async (sessionId, statementId) => {
    try {
        const codeOutputURL = new URL(`/sessions/${sessionId}/statements/${statementId}`, livyUrl).toString();
        console.log(`get-code-output-url: ${codeOutputURL}`);

        for (let i = 0; i < 4; i++) {
            const response = await axios.get(codeOutputURL);
            const codeOutputResponse = response.data;

            if (codeOutputResponse.state.toLowerCase() === 'available') {
                return codeOutputResponse;
            }

            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
        }

        throw new Error('Code output not available within the expected time.');
    } catch (error) {
        throw new Error(`Error while fetching response: ${error.message}`);
    }
};
