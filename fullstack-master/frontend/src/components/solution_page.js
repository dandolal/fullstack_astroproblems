import React from 'react';

import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {button_style, problems_background} from "./styles";

class solution_page extends React.Component {
    constructor({match, props}) {
        super(props);
        const {params: {problem_id}} = match;
        this.id = problem_id;
    }

    render() {
        return (
            <div style={problems_background}>
                <div className="container">
                    <h1>{this.props.problems_list.get(Number(this.id)).name}</h1>
                </div>
                <div className="card">
                    <div className="container" >
                        <h3>Условие</h3>
                        <p>{this.props.problems_list.get(Number(this.id)).task}</p>
                        <h3>Решение</h3>
                        <p>{this.props.problems_list.get(Number(this.id)).solution}</p>
                        <h4>Автор:</h4>
                        <p>{this.props.problems_list.get(Number(this.id)).author}</p>
                    </div>
                </div>
                <div className="container">
                    <Link to={`/problem/${this.id}`} className="btn btn-primary">Скрыть решение</Link>
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