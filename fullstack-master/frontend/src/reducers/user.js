import User from '../User/user'

let initialState ={
//     user: new User('', '', false),
    error: '',
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_ISLOGGED':
            console.log('login')
            console.log(action.user.user, 'action')
            return {
                ...state,
                user: action.user.user,
                error: ''
            };
        case 'USER_ISUNLOGGED':

            console.log('logout')
            return {...state, user: new User('', '', false)}
        case 'FAILED-TOLOGIN':
            return {
                ...state,
                error: action.error
            }
//         case 'EDIT-PROBLEM':
//             return {
//                 ...state,
//                 problems: problems
//             }
        case 'INITIALIZE':
            return {
                ...state,
                problems: action.data
            }
        default:
            return initialState;
    }
}

export default userReducer;