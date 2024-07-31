class StatementRequest {
    constructor({ code, kind }) {
        this.code = code;
        this.kind = kind;
    }

    static builder() {
        return new StatementRequestBuilder();
    }
}

class StatementRequestBuilder {
    constructor() {
        this.code = null;
        this.kind = null;
    }

    setCode(code) {
        this.code = code;
        return this;
    }

    setKind(kind) {
        this.kind = kind;
        return this;
    }

    build() {
        return new StatementRequest({ code: this.code, kind: this.kind });
    }
}

module.exports = StatementRequest;
