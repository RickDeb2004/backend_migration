class QuestionDetailsDTO {
    constructor({ questionDescription, datasetDescription, columnDefinition }) {
        this.questionDescription = questionDescription;
        this.datasetDescription = datasetDescription;
        this.columnDefinition = columnDefinition;
    }

    static builder() {
        return new QuestionDetailsDTOBuilder();
    }
}

class QuestionDetailsDTOBuilder {
    constructor() {
        this.questionDescription = null;
        this.datasetDescription = null;
        this.columnDefinition = null;
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

    build() {
        return new QuestionDetailsDTO({
            questionDescription: this.questionDescription,
            datasetDescription: this.datasetDescription,
            columnDefinition: this.columnDefinition
        });
    }
}

class QuestionDTO {
    constructor({
        id,
        heading,
        difficulty,
        tier,
        solutionTier,
        questionDetails,
        topics,
        templates,
        active
    }) {
        this.id = id;
        this.heading = heading;
        this.difficulty = difficulty;
        this.tier = tier;
        this.solutionTier = solutionTier;
        this.questionDetails = questionDetails;
        this.topics = topics;
        this.templates = templates;
        this.active = active;
    }

    static builder() {
        return new QuestionDTOBuilder();
    }
}

class QuestionDTOBuilder {
    constructor() {
        this.id = null;
        this.heading = null;
        this.difficulty = null;
        this.tier = null;
        this.solutionTier = null;
        this.questionDetails = null;
        this.topics = [];
        this.templates = [];
        this.active = null;
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

    setQuestionDetails(questionDetails) {
        this.questionDetails = questionDetails;
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

    setActive(active) {
        this.active = active;
        return this;
    }

    build() {
        return new QuestionDTO({
            id: this.id,
            heading: this.heading,
            difficulty: this.difficulty,
            tier: this.tier,
            solutionTier: this.solutionTier,
            questionDetails: this.questionDetails,
            topics: this.topics,
            templates: this.templates,
            active: this.active
        });
    }
}

module.exports = {
    QuestionDTO,
    QuestionDetailsDTO
};
