class CodeDTO {
    constructor({ code, codeLanguage, questionId }) {
        this.code = code;
        this.codeLanguage = codeLanguage;
        this.questionId = questionId;
    }

    static builder() {
        return new CodeDTOBuilder();
    }
}

class CodeDTOBuilder {
    constructor() {
        this.code = null;
        this.codeLanguage = null;
        this.questionId = null;
    }

    setCode(code) {
        this.code = code;
        return this;
    }

    setCodeLanguage(codeLanguage) {
        this.codeLanguage = codeLanguage;
        return this;
    }

    setQuestionId(questionId) {
        this.questionId = questionId;
        return this;
    }

    build() {
        return new CodeDTO({ code: this.code, codeLanguage: this.codeLanguage, questionId: this.questionId });
    }
}

module.exports = CodeDTO;
