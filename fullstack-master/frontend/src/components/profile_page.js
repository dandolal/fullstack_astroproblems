import React from 'react'
import {toLogout} from "../action";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {problem_card_style, problems_background} from "./styles";


const user_problem_card = (props) => {
    console.log(props.problem[1])
    const name = props.username

    return (
        <div>{name === props.problem[1].user && <div style={problem_card_style} onClick={() => {
            props.history.push(`/problem/${props.problem[0]}`)
        }}>
            <h3 style={{padding: '4px 8px'}}>{props.problem[1].name}</h3>
            <p style={{marginLeft: 'auto', marginRight: 'auto'}}>{props.problem[1].task}</p>
            <p>{props.problem[1].author}</p>
        </div>}
        </div>
    )
}


class profile extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.props.user.login;

        this.state = {login: this.login,};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()


        this.props.logout(this.props.user.login).then(() => {
            this.props.history.push('/');
        })
    }

    render() {

        return (
            <div>


                <p className="w3-xxlarge"> Я {this.props.user.login}</p>

                <form onSubmit={this.handleSubmit}>

                    <button type="submit" value="Выйти" className="btn btn-primary">Выйти</button>
                </form>
                <p> </p>
                <Link to={`/add_problem`} className="btn btn-primary">Добавить задачу</Link>
                <div>


                    { this.props.problems_list && <div style={problems_background}>
                        <h1 style={{padding: '8px 16px', opacity: '1'}}>Мои задачи</h1>
                        <div>{Array.from(this.props.problems_list).map((problem, index) => (
                            user_problem_card({
                                problem: problem,
                                index: index,
                                history: this.props.history,
                                username: this.props.user.login
                            })
                        ))}
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        problems_list: state.userReducer.problems
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('map logout')
    return {
        logout: (login) => dispatch(toLogout(login)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(profile);