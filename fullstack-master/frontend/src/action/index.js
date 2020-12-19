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

export function toLogin(login, password) {
    return dispatch => {
        return userService.login(login, password).then((data) => {
            console.log(data, 'toLogin');
            dispatch(fetchIsLogged(data));
        }).catch((error) => {
            console.log('error!!!!!', error)
            dispatch(fetchFailedToLogin(error))
            throw Error(error)
        });
    }
}

export function toRegister(login, password) {
    return dispatch => {
        return userService.register(login, password).then((data) => {
            console.log(data, 'toRegister');
            dispatch(fetchIsLogged(data));
        }).catch((error) => {
            console.log('error!!!!!', error)
            dispatch(fetchFailedToLogin(error))
            throw Error(error)
        });
    }
}

export function toLogout(login) {
    return dispatch => {
        return userService.logout(login).then((data) => {
            console.log(data, 'toLogout ');
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