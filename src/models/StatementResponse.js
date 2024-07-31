class StatementResponse {
    constructor({ id, code, state }) {
        this.id = id;
        this.code = code;
        this.state = state;
    }

    static builder() {
        return new StatementResponseBuilder();
    }
}

class StatementResponseBuilder {
    constructor() {
        this.id = null;
        this.code = null;
        this.state = null;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setCode(code) {
        this.code = code;
        return this;
    }

    setState(state) {
        this.state = state;
        return this;
    }

    build() {
        return new StatementResponse({
            id: this.id,
            code: this.code,
            state: this.state
        });
    }
}

module.exports = StatementResponse;
