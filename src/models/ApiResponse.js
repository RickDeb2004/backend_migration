const moment = require('moment');

class ApiResponse {
    constructor({ success, status, message = null, data = null }) {
        this.success = success;
        this.status = status;
        this.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        this.message = message;
        this.data = data;
    }

    static builder() {
        return new ApiResponseBuilder();
    }

    static success(data) {
        return new ApiResponse({ success: true, status: 200, data });
    }

    static successWithMessage(message, data) {
        return new ApiResponse({ success: true, status: 200, message, data });
    }

    static failure(message) {
        return new ApiResponse({ success: false, status: 500, message });
    }

    static failureWithStatus(status, message) {
        return new ApiResponse({ success: false, status, message });
    }
}

class ApiResponseBuilder {
    constructor() {
        this.success = null;
        this.status = null;
        this.message = null;
        this.data = null;
    }

    setSuccess(success) {
        this.success = success;
        return this;
    }

    setStatus(status) {
        this.status = status;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    build() {
        return new ApiResponse({
            success: this.success,
            status: this.status,
            message: this.message,
            data: this.data
        });
    }
}

module.exports = ApiResponse;
