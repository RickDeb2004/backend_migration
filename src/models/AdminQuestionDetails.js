const TopicDTO = require('./Topic');
const QuestionLanguageTemplateDTO = require('./QuestionLanguageTemplate');
const SolutionDTO = require('./Solution');
const QuestionInputFile = require('./QuestionInputFile');  // Assuming you have a similar model for QuestionInputFile

class AdminQuestionDetailsDTO {
    constructor({
        id,
        heading,
        difficulty,
        tier,
        solutionTier,
        questionDescription,
        datasetDescription,
        columnDefinition,
        active,
        topics,
        templates,
        solutions,
        inputFiles
    }) {
        this.id = id;
        this.heading = heading;
        this.difficulty = difficulty;
        this.tier = tier;
        this.solutionTier = solutionTier;
        this.questionDescription = questionDescription;
        this.datasetDescription = datasetDescription;
        this.columnDefinition = columnDefinition;
        this.active = active;
        this.topics = topics;
        this.templates = templates;
        this.solutions = solutions;
        this.inputFiles = inputFiles;
    }

    static builder() {
        return new AdminQuestionDetailsDTOBuilder();
    }
}

class AdminQuestionDetailsDTOBuilder {
    constructor() {
        this.id = null;
        this.heading = null;
        this.difficulty = null;
        this.tier = null;
        this.solutionTier = null;
        this.questionDescription = null;
        this.datasetDescription = null;
        this.columnDefinition = null;
        this.active = null;
        this.topics = [];
        this.templates = [];
        this.solutions = [];
        this.inputFiles = [];
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setHeading(heading) {
        this.heading = heading;
        return this;
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    setTier(tier) {
        this.tier = tier;
        return this;
    }

    setSolutionTier(solutionTier) {
        this.solutionTier = solutionTier;
        return this;
    }

    setQuestionDescription(questionDescription) {
        this.questionDescription = questionDescription;
        return this;
    }

    setDatasetDescription(datasetDescription) {
        this.datasetDescription = datasetDescription;
        return this;
    }

    setColumnDefinition(columnDefinition) {
        this.columnDefinition = columnDefinition;
        return this;
    }

    setActive(active) {
        this.active = active;
        return this;
    }

    setTopics(topics) {
        this.topics = topics;
        return this;
    }

    setTemplates(templates) {
        this.templates = templates;
        return this;
    }

    setSolutions(solutions) {
        this.solutions = solutions;
        return this;
    }

    setInputFiles(inputFiles) {
        this.inputFiles = inputFiles;
        return this;
    }

    build() {
        return new AdminQuestionDetailsDTO({
            id: this.id,
            heading: this.heading,
            difficulty: this.difficulty,
            tier: this.tier,
            solutionTier: this.solutionTier,
            questionDescription: this.questionDescription,
            datasetDescription: this.datasetDescription,
            columnDefinition: this.columnDefinition,
            active: this.active,
            topics: this.topics,
            templates: this.templates,
            solutions: this.solutions,
            inputFiles: this.inputFiles
        });
    }
}

module.exports = AdminQuestionDetailsDTO;
