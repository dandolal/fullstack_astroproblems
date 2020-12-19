import React, {useState} from 'react';
import {connect} from "react-redux";
import Problem from "../problem/Problem";
import {editProblem, toInit} from "../action";

function  EditForm(props){
    const {params: id} = props.match;
    console.log(id.problem_id)
    console.log(props.match)
    console.log(props)
    const problem = props.problems_list.get(Number(id.problem_id))
    const [state, setState] = useState({name: problem.name,
        task: problem.task,
        solution: problem.solution,
        author: problem.author})


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
        props.editProblem(new Problem(name, task, solution, author, problem.user, problem.id), props.user).then(() => {
            console.log(name, task, solution)

            props.history.push(`/problem/${problem.id}`);
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
        editProblem :(...args) => dispatch(editProblem(...args)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);