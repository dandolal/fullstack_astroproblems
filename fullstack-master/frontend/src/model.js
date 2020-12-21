import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";


const user_button = (props) => {
    return (
        <Link to={`/profile`}
              className="w3-bar-item w3-button w3-padding-16"><i
            class="far fa-user"></i><b> {props.user.login}</b></Link>
    )
}

const login_button = (props) => {
    return (
        <Link to={`/login`} className="w3-bar-item w3-button w3-padding-16"><i
            className="fas fa-sign-in-alt"></i>
            Войти</Link>
    )
}

class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let button;
        if (!this.props.user || !this.props.user.isLogged) {
            console.log(this.props.user)
            console.log(')')
            button = login_button()
        } else {
            button = user_button(this.props);
        }

        return (

            <div className="w3-bar w3-black  w3-card" id="myNavbar">
                <Link to="/" className="w3-bar-item title">
                    Astro-problems
                </Link>
                <div className="w3-right w3-hide-small w3-hide-medium">

                    <Link to="/problems_page"
                          className="w3-bar-item w3-button w3-padding-16"><i
                        className="fab fa-wpexplorer"></i> Задачи</Link>

                    {button}
                </div>


            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("map sate to props", state.user)
    console.log("map sate to props", state.userReducer.user)
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
