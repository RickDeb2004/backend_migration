class SolutionDTO {
    constructor({ language, solution, explanation, complexity, optimization }) {
        this.language = language;
        this.solution = solution;
        this.explanation = explanation;
        this.complexity = complexity;
        this.optimization = optimization;
    }

    static builder() {
        return new SolutionDTOBuilder();
    }
}

class SolutionDTOBuilder {
    constructor() {
        this.language = null;
        this.solution = null;
        this.explanation = null;
        this.complexity = null;
        this.optimization = null;
    }

    setLanguage(language) {
        this.language = language;
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

    build() {
        return new SolutionDTO({
            language: this.language,
            solution: this.solution,
            explanation: this.explanation,
            complexity: this.complexity,
            optimization: this.optimization
        });
    }
}

module.exports = SolutionDTO;
