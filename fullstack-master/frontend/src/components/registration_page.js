import React from 'react'
import {connect} from "react-redux";
import {toRegister} from "../action";
import {Link} from "react-router-dom";
import Input from "./input";
import Button from "./button";

class register extends React.Component {
    constructor(props) {
        super(props);
        this.login = '';
        this.password = '';

        this.state = {login: '', password: ''};

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(event) {
        this.setState({login: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            login,
            password
        } = this.state;


        this.props.register(login, password).then(() => {
            this.props.history.push(`/profile/${this.props.user.login}`);
        }).catch((error) => {this.setState({login: '', password: '', error: error})})
    }

    handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }


    render() {
        let {login, password} = this.state;
        return (
            <div>

                <form>
                    <label>
                        <Input type="text" placeholder='Логин' value={login} onChange={this.handleLoginChange}
                               onKeyDown={this.handleKeyDown}/>
                        <Input type="password" placeholder='Пароль' value={password} onChange={this.handlePasswordChange}
                               onKeyDown={this.handleKeyDown}/>
                    </label>
                    <Button type="submit" value="Войти" className="btn btn-primary"
                            onClick={this.handleSubmit} message="Зарегистрироваться"/>

                </form>
                <p style={{color: 'red'}}>{this.props.error}</p>
                <Link to='/login' className="btn btn-primary">Войти</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        error: state.userReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (...args) => dispatch(toRegister(...args)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(register);