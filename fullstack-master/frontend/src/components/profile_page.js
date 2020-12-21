import React from 'react'
import {toLogout} from "../action";
import {connect} from "react-redux";
import {Link, Redirect, useHistory} from "react-router-dom";
import {problem_card_style, problems_background_user} from "./styles";
import style from "./index.css";


class User_problem_card extends React.Component{
    constructor(props) {
        super(props);
        this.name = this.props.username
        this.state = {name: this.name}
    }
    click
    render() {
        const {redirect} = this.state
        if (redirect) {
            return <Redirect to={'/problem/' + this.props.problem[1].id}/>
        }

        return (

            <div> {this.name === this.props.problem[1].user &&
            <div className={style.card}>
                <div className="card" onClick={() => {
                    this.setState({redirect: true})
                }}>
                    <div className="container">
                        <h3 style={{padding: '4px 8px'}}>{this.props.problem[1].name}</h3>
                        <p style={{marginLeft: 'auto', marginRight: 'auto'}}>{this.props.problem[1].task}</p>
                        <p>{this.props.problem[1].author}</p>
                    </div>
                </div>
            </div>}
            </div>
        )
    }
}


class Profile extends React.Component {
    constructor(props, cookies) {
        super(props);
        this.cookies = cookies;
        this.login = this.props.user.login;
        console.log(this.cookies)
        console.log(this.props)
        this.state = {login: this.login,};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()


        this.props.logout(this.props.user.login, this.props.cookies).then(() => {this.setState({redirect: true})}
        )
    }

    render() {

        console.log(this.props)
        const {redirect} = this.state
        if (redirect) {
            return <Redirect to='/'/>
        }

        return (
            <div>


                <p className="w3-xxlarge"> Я {this.props.user.login}</p>

                <form onSubmit={this.handleSubmit}>

                    <button type="submit" value="Выйти" className="btn btn-primary">Выйти</button>
                </form>
                <p></p>
                <Link to={`/add_problem`} className="btn btn-primary">Добавить задачу</Link>
                <div>


                    {this.props.problems_list && <div style={problems_background_user}>
                        <h1 style={{padding: '8px 16px', opacity: '1'}}>Мои задачи</h1>
                        <div>{Array.from(this.props.problems_list).map((problem, index) => (

                            //     new User_problem_card({
                            //     problem: problem,
                            //     index: index,
                            //     username: this.props.user.login
                            // })
                            <User_problem_card problem={problem} inde={index} username={this.props.user.login}/>
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
        logout: (...args) => dispatch(toLogout(...args)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);