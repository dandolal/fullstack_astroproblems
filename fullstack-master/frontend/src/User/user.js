class User {
    constructor(login, password, isLogged) {
        this.login = login
        this.password = password
        this.isLogged = isLogged
    }

//     setIsLogged(isLogged) {
//         this.isLogged = isLogged
//     }
//     set isLogged(isLogged) {
//         this.isLogged = isLogged
//     }

    getLogin() {
        return this.login
    }

    getPassword() {
        return this.password
    }
}

export default User