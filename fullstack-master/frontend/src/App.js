import React, {useEffect} from 'react';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import start_page from "./components/start_page";
import problems_page from "./components/problems_page";
import Header from "./model";
import problem_page from "./components/problem_page";
import solution_page from "./components/solution_page";
import EditForm from "./components/edit";
import Login from "./components/login_page";
import Profile from "./components/profile_page";
import Register from "./components/registration_page"
import {connect} from "react-redux";
import {toInit, toLogin} from "./action/index"
import AddProblem from "./components/add_problem";
import PrivateRoute from "./components/PrivateRoute";
import {withCookies} from "react-cookie";


function App(props) {


    useEffect(() => {
        props.initialize()
    }, [])

    let cookies = props.cookies.get('user')
    if (!props.user && cookies && cookies.login !== "") {

        let login = cookies.login
        let password = cookies.password
        props.tologin(login, password, props.cookies)
    }
    console.log(props.user)
    console.log(props.state)
    return (
        <div className={"background"}>

            <BrowserRouter>

                <div>
                    {/*<navigation/>*/}
                    <Header/>
                    <Switch>
                        <Route path="/" component={start_page} exact/>
                        <Route path="/problems_page" component={problems_page}/>
                        <Route path="/problem/:problem_id" component={problem_page}/>
                        <Route path="/solution_page/:problem_id" component={solution_page}/>
                        <PrivateRoute path="/edit/:problem_id" component={EditForm}/>
                        <Route path="/register" render={() => (<Register cookies={props.cookies}/>)}/>
                        <Route path="/login" render={() => (<Login cookies={props.cookies}/>)}/>
                        <PrivateRoute path="/profile"
                                      render={() => (<Profile cookies={props.cookies}/>)} cookies={props.cookies}/>

                        <PrivateRoute path="/add_problem" component={AddProblem}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initialize: (...args) => dispatch(toInit(...args)),
        tologin: (...args) => dispatch(toLogin(...args))
    }
};

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default withCookies(ConnectApp);
