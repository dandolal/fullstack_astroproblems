import userService from "../User";

export function fetchIsLogged(user) {
    return {
        type: 'USER_ISLOGGED',
        user
    }
}
 export function fetchInitialize(data) {
    return {
        type: 'INITIALIZE',
        data
    }
 }

export function fetchIsNotLogged() {
    return {
        type: 'USER_ISUNLOGGED',
    }
}

export function fetchFailedToLogin(error) {
    return {
        type: 'FAILED-TOLOGIN',
        error
    }
}

export function fetchEditProblem(problems) {
    return {
        type: 'EDIT-PROBLEM',

    }
}

export function toLogin(login, password, cookies) {
    return dispatch => {
        return userService.login(login, password).then((data) => {
            console.log(data, 'toLogin');
            cookies.set('user', {'login': login, 'password': password}, { expires: new Date(Date.now() + 1000 * 60 * 10) })
            dispatch(fetchIsLogged(data));
        }).catch((error) => {
            console.log('error!!!!!', error)
            dispatch(fetchFailedToLogin(error))
            throw Error(error)
        });
    }
}

export function toRegister(login, password, cookies) {
    return dispatch => {
        return userService.register(login, password).then((data) => {
            console.log(data, 'toRegister');
            cookies.set('user', {'login': login, 'password': password}, { expires: new Date(Date.now() + 1000 * 60 * 10) })
            dispatch(fetchIsLogged(data));
        }).catch((error) => {
            console.log('error!!!!!', error)
            dispatch(fetchFailedToLogin(error))
            throw Error(error)
        });
    }
}

export function toLogout(login, cookies) {
    return dispatch => {
        return userService.logout(login).then((data) => {
            console.log(data, 'toLogout ');
            cookies.set('user', {'login': "", 'password': ""})
            dispatch(fetchIsNotLogged());
        })
    }
}

export function editProblem(problem, user) {
    return dispatch => {
        return userService.editProblem(problem, user)

    }
}

export function addProblem(problem, user) {
    return dispatch => {
        return userService.addProblem(problem, user)

    }
}

export function toInit() {
    return dispatch => {
        return userService.init().then((data) => {
            dispatch(fetchInitialize(data));
        })
    }
}