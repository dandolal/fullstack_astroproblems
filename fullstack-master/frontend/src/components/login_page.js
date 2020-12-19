import React from 'react'
import {connect} from "react-redux";
import {toLogin} from "../action";
import {Link} from "react-router-dom";
import styles from './form.css'
import Input from "./input";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {login: '', password: '', error: this.props.error};

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


        this.props.login(login, password).then(() => {
            this.props.history.push('/');
        }).catch((error) => {
            this.setState({login: '', password: '', error: error})
        })
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

                    <Input name='Логин' placeholder='Логин' type="text" value={login} onChange={this.handleLoginChange}
                           onKeyDown={this.handleKeyDown}/>
                    <Input name='Пароль' error={this.props.error} placeholder='Пароль' type="password" value={password}
                           onChange={this.handlePasswordChange}
                           onKeyDown={this.handleKeyDown}/>

                    <button type="submit" value="Войти" className="btn btn-primary"
                            onClick={this.handleSubmit}>Войти
                    </button>
                </form>
                <p style={{color: 'red'}}>{this.props.error}</p>
                <Link to='/register' className="btn btn-primary">Зарегистрироваться</Link>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.userReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (...args) => dispatch(toLogin(...args)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);