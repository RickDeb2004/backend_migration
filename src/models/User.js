class UserDTO {
    constructor({ id, sub, isAdmin }) {
        this.id = id;
        this.sub = sub;
        this.isAdmin = isAdmin;
    }

    static builder() {
        return new UserDTOBuilder();
    }
}

class UserDTOBuilder {
    constructor() {
        this.id = null;
        this.sub = null;
        this.isAdmin = null;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setSub(sub) {
        this.sub = sub;
        return this;
    }

    setIsAdmin(isAdmin) {
        this.isAdmin = isAdmin;
        return this;
    }

    build() {
        return new UserDTO({ id: this.id, sub: this.sub, isAdmin: this.isAdmin });
    }
}

module.exports = UserDTO;
