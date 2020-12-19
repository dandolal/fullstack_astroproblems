import User from './User/user'
import Problem from "./problem/Problem";

let user1 = new User('user', '1234', false)

let Danya = new User('Даня', '1234', false)

export let users = new Map([[user1.login, user1], [Danya.login, Danya]])

let problem1 = new Problem('Первая задача', 'Условие1', 'Решение1', 'автор1', 'Даня', 0)
let problem2 = new Problem('Вторая задача', 'Условие2', 'Решение2', 'автор2', 'Даня', 1)
let problem3 = new Problem('Третья задача', 'Условие3', 'Решение3', 'автор3', 'user', 2)

export let problems = new Map([[problem1.id, problem1], [problem2.id, problem2], [problem3.id, problem3]])