const CodeOutput = require('./CodeOutput');  // Ensure you have a similar model for CodeOutput

class CodeOutputResponse {
    constructor({ id, state, output }) {
        this.id = id;
        this.state = state;
        this.output = output;
    }

    static builder() {
        return new CodeOutputResponseBuilder();
    }
}

class CodeOutputResponseBuilder {
    constructor() {
        this.id = null;
        this.state = null;
        this.output = null;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setState(state) {
        this.state = state;
        return this;
    }

    setOutput(output) {
        this.output = output;
        return this;
    }

    build() {
        return new CodeOutputResponse({
            id: this.id,
            state: this.state,
            output: this.output
        });
    }
}

module.exports = CodeOutputResponse;
