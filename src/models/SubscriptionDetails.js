class SubscriptionDetails {
    constructor({ endDate }) {
        this.endDate = endDate;
    }

    static builder() {
        return new SubscriptionDetailsBuilder();
    }
}

class SubscriptionDetailsBuilder {
    constructor() {
        this.endDate = null;
    }

    setEndDate(endDate) {
        this.endDate = endDate;
        return this;
    }

    build() {
        return new SubscriptionDetails({ endDate: this.endDate });
    }
}

module.exports = SubscriptionDetails;
