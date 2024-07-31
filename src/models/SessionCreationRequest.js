class SessionCreationRequest {
    constructor({
        kind,
        driverMemory,
        driverCores,
        executorMemory,
        executorCores,
        numExecutors
    }) {
        this.kind = kind;
        this.driverMemory = driverMemory;
        this.driverCores = driverCores;
        this.executorMemory = executorMemory;
        this.executorCores = executorCores;
        this.numExecutors = numExecutors;
    }

    static builder() {
        return new SessionCreationRequestBuilder();
    }
}

class SessionCreationRequestBuilder {
    constructor() {
        this.kind = null;
        this.driverMemory = null;
        this.driverCores = null;
        this.executorMemory = null;
        this.executorCores = null;
        this.numExecutors = null;
    }

    setKind(kind) {
        this.kind = kind;
        return this;
    }

    setDriverMemory(driverMemory) {
        this.driverMemory = driverMemory;
        return this;
    }

    setDriverCores(driverCores) {
        this.driverCores = driverCores;
        return this;
    }

    setExecutorMemory(executorMemory) {
        this.executorMemory = executorMemory;
        return this;
    }

    setExecutorCores(executorCores) {
        this.executorCores = executorCores;
        return this;
    }

    setNumExecutors(numExecutors) {
        this.numExecutors = numExecutors;
        return this;
    }

    build() {
        return new SessionCreationRequest({
            kind: this.kind,
            driverMemory: this.driverMemory,
            driverCores: this.driverCores,
            executorMemory: this.executorMemory,
            executorCores: this.executorCores,
            numExecutors: this.numExecutors
        });
    }
}

module.exports = SessionCreationRequest;
