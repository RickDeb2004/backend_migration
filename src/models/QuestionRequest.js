class SolutionRequestDTO {
    constructor({ solution, explanation, complexity, optimization }) {
        this.solution = solution;
        this.explanation = explanation;
        this.complexity = complexity;
        this.optimization = optimization;
    }
}

class QuestionRequest {
    constructor({
        active,
        id,
        heading,
        difficulty,
        tier,
        solutionTier,
        questionDescription,
        datasetDescription,
        columnDefinition,
        inputFilesS3URLS,
        topicIds,
        languageTemplates,
        solutions
    }) {
        this.active = active;
        this.id = id;
        this.heading = heading;
        this.difficulty = difficulty;
        this.tier = tier;
        this.solutionTier = solutionTier;
        this.questionDescription = questionDescription;
        this.datasetDescription = datasetDescription;
        this.columnDefinition = columnDefinition;
        this.inputFilesS3URLS = inputFilesS3URLS;
        this.topicIds = topicIds;
        this.languageTemplates = languageTemplates;
        this.solutions = solutions;
    }

    static fromJson(json) {
        const solutions = new Map();
        for (const [key, value] of Object.entries(json.solutions)) {
            solutions.set(Number(key), new SolutionRequestDTO(value));
        }

        return new QuestionRequest({
            ...json,
            solutions
        });
    }
}

module.exports = {
    QuestionRequest,
    SolutionRequestDTO
};
