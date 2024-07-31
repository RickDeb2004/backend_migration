const SuccessData = require('./SuccessData');  // Ensure you have a similar model for SuccessData

class CodeOutput {
    constructor({ status, ename, evalue, data }) {
        this.status = status;
        this.ename = ename;
        this.evalue = evalue;
        this.data = data;
    }

    static builder() {
        return new CodeOutputBuilder();
    }
}

class CodeOutputBuilder {
    constructor() {
        this.status = null;
        this.ename = null;
        this.evalue = null;
        this.data = null;
    }

    setStatus(status) {
        this.status = status;
        return this;
    }

    setEname(ename) {
        this.ename = ename;
        return this;
    }

    setEvalue(evalue) {
        this.evalue = evalue;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    build() {
        return new CodeOutput({
            status: this.status,
            ename: this.ename,
            evalue: this.evalue,
            data: this.data
        });
    }
}

module.exports = CodeOutput;
