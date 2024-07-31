class LanguageDTO {
    constructor({ id, name, tier }) {
        this.id = id;
        this.name = name;
        this.tier = tier;
    }

    static builder() {
        return new LanguageDTOBuilder();
    }
}

class LanguageDTOBuilder {
    constructor() {
        this.id = null;
        this.name = null;
        this.tier = null;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setTier(tier) {
        this.tier = tier;
        return this;
    }

    build() {
        return new LanguageDTO({ id: this.id, name: this.name, tier: this.tier });
    }
}

module.exports = LanguageDTO;
