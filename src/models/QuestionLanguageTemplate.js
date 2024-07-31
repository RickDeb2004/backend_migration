class QuestionLanguageTemplateDTO {
    constructor({ language, template }) {
        this.language = language;
        this.template = template;
    }

    static builder() {
        return new QuestionLanguageTemplateDTOBuilder();
    }
}

class QuestionLanguageTemplateDTOBuilder {
    constructor() {
        this.language = null;
        this.template = null;
    }

    setLanguage(language) {
        this.language = language;
        return this;
    }

    setTemplate(template) {
        this.template = template;
        return this;
    }

    build() {
        return new QuestionLanguageTemplateDTO({
            language: this.language,
            template: this.template
        });
    }
}

module.exports = QuestionLanguageTemplateDTO;
