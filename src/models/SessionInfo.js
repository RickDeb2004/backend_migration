const Session = require('./Session');  // Ensure you have a similar model for Session

class SessionInfo {
    constructor({ sessions }) {
        this.sessions = sessions;
    }

    static builder() {
        return new SessionInfoBuilder();
    }
}

class SessionInfoBuilder {
    constructor() {
        this.sessions = [];
    }

    setSessions(sessions) {
        this.sessions = sessions;
        return this;
    }

    build() {
        return new SessionInfo({ sessions: this.sessions });
    }
}

module.exports = SessionInfo;
