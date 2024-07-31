class Session {
    constructor({ id, state }) {
        this.id = id;
        this.state = state;
    }

    static builder() {
        return new SessionBuilder();
    }
}

class SessionBuilder {
    constructor() {
        this.id = null;
        this.state = null;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setState(state) {
        this.state = state;
        return this;
    }

    build() {
        return new Session({ id: this.id, state: this.state });
    }
}

module.exports = Session;
