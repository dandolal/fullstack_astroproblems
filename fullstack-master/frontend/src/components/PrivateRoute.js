import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from 'react-router-dom'

function PrivateRoute(props) {
    console.log('In Router');
    const {user, ...rest} = props;
    if (!user) {

        
            return <Redirect to={{pathname: '/login'}}/>
    }
    return (
        <Route {...rest}/>
    );
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps)(PrivateRoute);