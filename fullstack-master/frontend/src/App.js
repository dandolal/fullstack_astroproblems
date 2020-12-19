import React , {useEffect} from 'react';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import start_page from "./components/start_page";
import problems_page from "./components/problems_page";
import Header from "./model";
import problem_page from "./components/problem_page";
import solution_page from "./components/solution_page";
import EditForm from "./components/edit";
import Login from "./components/login_page";
import profile from "./components/profile_page";
import register from "./components/registration_page"
import {connect} from "react-redux";
import {toInit} from "./action/index"
import AddProblem from "./components/add_problem";
import PrivateRoute from "./components/PrivateRoute";



function App(props){


        useEffect(()=>{props.initialize()},[])

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
                            <Route path ="/problem/:problem_id" component={problem_page}/>
                            <Route path ="/solution_page/:problem_id" component={solution_page}/>
                            <PrivateRoute path="/edit/:problem_id" component={EditForm}/>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/profile/:user_name" component={profile}/>
                            <Route path="/register" component={register} />
                            <PrivateRoute path="/add_problem" component={AddProblem} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )

}

const mapStateToProps = (state) => {
    return {
        problems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initialize: (...args) => dispatch(toInit(...args))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
