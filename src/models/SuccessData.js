class SuccessData {
    constructor({ textPlain }) {
        this['text/plain'] = textPlain;
    }

    static builder() {
        return new SuccessDataBuilder();
    }
}

class SuccessDataBuilder {
    constructor() {
        this.textPlain = null;
    }

    setTextPlain(textPlain) {
        this['text/plain'] = textPlain;
        return this;
    }

    build() {
        return new SuccessData({ textPlain: this['text/plain'] });
    }
}

module.exports = SuccessData;
