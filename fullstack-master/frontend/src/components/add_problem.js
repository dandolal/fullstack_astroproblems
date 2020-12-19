import React, {useState} from 'react';
import {connect} from "react-redux";
import Problem from "../problem/Problem";
import {addProblem, toInit} from "../action";

function  AddProblem(props){


    const [state, setState] = useState({name: '',
        task: '',
        solution: '',
        author: ''})


    const handleChangeName = (event) => {
        setState({...state, name: event.target.value});
    }
    const handleChangeTask = (event) => {
        setState({...state, task: event.target.value});
    }
    const handleChangeSolution = (event) => {
        setState({...state, solution: event.target.value});
    }
    const handleChangeAuthor = (event) => {
        setState({...state, author: event.target.value});
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        const {name, task, solution, author} = state;
        console.log(name, task, solution)
        props.addProblem(new Problem(name, task, solution, author, props.user.login), props.user).then(() => {
            console.log(name, task, solution)

            props.history.push(`/problems_page`);
            props.reload()
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }


    let {name, task, solution, author} = state;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Название:
                    <input type="text" value={name} onChange={handleChangeName}
                           onKeyDown={handleKeyDown}/>
                    Условие:
                    <input type="text" value={task} onChange={handleChangeTask}
                           onKeyDown={handleKeyDown}/>
                    Решение:
                    <input type="text" value={solution} onChange={handleChangeSolution}
                           onKeyDown={handleKeyDown}/>
                    Автор:
                    <input type="text" value={author} onChange={handleChangeAuthor}
                           onKeyDown={handleKeyDown}/>
                </label>
                <input type="submit" value="Сохранить" className="btn btn-primary"/>
            </form>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        problems_list: state.userReducer.problems,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reload: (...args) => dispatch(toInit(...args)),
        addProblem :(...args) => dispatch(addProblem(...args)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProblem);