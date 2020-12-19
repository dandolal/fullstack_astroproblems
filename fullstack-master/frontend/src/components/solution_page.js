import React from 'react';

import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {button_style} from "./styles";

class solution_page extends React.Component {
    constructor({match, props}) {
        super(props);
        const {params: {problem_id}} = match;
        this.id = problem_id;
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Я {this.props.problems_list.get(Number(this.id)).name} задача и ее решение </h1>
                </div>
                <div>
                    <Link to={`/problem/${this.id}`} className="btn btn-primary">Условие</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problems_list: state.userReducer.problems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(solution_page);