import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);




ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

