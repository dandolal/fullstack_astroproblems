import User from './user'
// import {users, problems} from "../globals";
import Problem from "../problem/Problem";
import API from '../Api/index'

function resolve(x) {
    return new Promise(func => {
        setTimeout(() => {
            func(x);
        }, 1);
    });
}

function reject(error) {
    return new Promise((resolve, func) => {
        setTimeout(() => {
            func(error);
        }, 1);
    });
}

const userService = {
    async login(login, password) {
        let response = await API.get('/login', {params: {'username': login, 'password': password}})
        console.log(response.data)
        if (response.data === 1) {
            return reject('Нет таких зарегистрированных пользователей');
        } else {
            if (response.data === 2) {
                return reject('Неверный пароль');
            } else {
                return resolve({user: new User(login, password, true)});
            }
        }
    },

    async logout() {
        return resolve({user: null});
    },

    async register(login, password) {
        console.log(login)
        console.log(password)
        if (login === "") {
            return reject('Заполните поле логин')
        }
        if (password === "") {
            return reject('Заполните поле пароль')
        }
        const response = await API.post('/signup', {'username': login, 'password': password})
        console.log(response)

        if (response.data === false) {
            return reject('Такой пользователь уже существует')
        } else {
            return resolve({user: new User(login, password, true)});
        }
    },

    async editProblem(problem, user) {
        const username = user.login
        const password = user.password
        const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
        const data = {
            'title': problem.name,
            'statement': problem.task,
            'solution': problem.solution,
            'author': problem.author,
            'username': user.login,
            'id': problem.id
        }
        let response = await API.post('/problem', data, {headers: {'Authorization': `Basic ${token}`}})
        problem = response.data
        return resolve({problem: new Problem(problem.title, problem.statement, problem.solution, problem.author, problem.username, problem.id) })
    },

    async addProblem(problem, user) {
        const username = user.login
        const password = user.password
        const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
        const data = {
            'title': problem.name,
            'statement': problem.task,
            'solution': problem.solution,
            'author': problem.author,
            'username': user.login
        }
        let response = await API.post('/problem', data, {headers: {'Authorization': `Basic ${token}`}})
        problem = response.data
        return resolve({problem: new Problem(problem.title, problem.statement, problem.solution, problem.author, problem.username, problem.id) })
    },

    async init() {
        let problems_list_back = await API.get('/problem/all')
        console.log('I am here')
        console.log(problems_list_back.data)
        let problems_list = new Map()
        problems_list_back.data.forEach(function (problem) {
            problems_list.set(problem.id,
                new Problem(problem.title, problem.statement, problem.solution, problem.author, problem.username, problem.id)
            )
        })
        return resolve(problems_list)
    }

}

export default userService