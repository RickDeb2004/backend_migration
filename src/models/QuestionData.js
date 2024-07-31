class QuestionData {
    constructor({
        id,
        codeLanguage,
        questionHeading,
        questionDescription,
        datasetDescription,
        columnDefinition,
        solution,
        explanation,
        complexity,
        optimization,
        difficulty,
        topics
    }) {
        this.id = id;
        this.codeLanguage = codeLanguage;
        this.questionHeading = questionHeading;
        this.questionDescription = questionDescription;
        this.datasetDescription = datasetDescription;
        this.columnDefinition = columnDefinition;
        this.solution = solution;
        this.explanation = explanation;
        this.complexity = complexity;
        this.optimization = optimization;
        this.difficulty = difficulty;
        this.topics = topics;
    }

    static builder() {
        return new QuestionDataBuilder();
    }
}

class QuestionDataBuilder {
    constructor() {
        this.id = null;
        this.codeLanguage = null;
        this.questionHeading = null;
        this.questionDescription = null;
        this.datasetDescription = null;
        this.columnDefinition = null;
        this.solution = null;
        this.explanation = null;
        this.complexity = null;
        this.optimization = null;
        this.difficulty = null;
        this.topics = null;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setCodeLanguage(codeLanguage) {
        this.codeLanguage = codeLanguage;
        return this;
    }

    setQuestionHeading(questionHeading) {
        this.questionHeading = questionHeading;
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

    setSolution(solution) {
        this.solution = solution;
        return this;
    }

    setExplanation(explanation) {
        this.explanation = explanation;
        return this;
    }

    setComplexity(complexity) {
        this.complexity = complexity;
        return this;
    }

    setOptimization(optimization) {
        this.optimization = optimization;
        return this;
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    setTopics(topics) {
        this.topics = topics;
        return this;
    }

    build() {
        return new QuestionData({
            id: this.id,
            codeLanguage: this.codeLanguage,
            questionHeading: this.questionHeading,
            questionDescription: this.questionDescription,
            datasetDescription: this.datasetDescription,
            columnDefinition: this.columnDefinition,
            solution: this.solution,
            explanation: this.explanation,
            complexity: this.complexity,
            optimization: this.optimization,
            difficulty: this.difficulty,
            topics: this.topics
        });
    }
}

module.exports = QuestionData;
