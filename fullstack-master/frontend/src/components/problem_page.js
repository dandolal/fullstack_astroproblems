import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {problems_background_user} from "./styles";

class problem_page extends React.Component {
    constructor({match, props}) {
        super(props);
        const {params: {problem_id}} = match;
        this.id = problem_id;
    }

    render()
    { console.log(this.id)
        console.log(this.props.problems_list.get(Number(this.id)))
        console.log(this.props.problems_list)
        return (
            <div>

                <div style={problems_background_user}>

                    <div className="container">
                        <h1>{this.props.problems_list.get(Number(this.id)).name}</h1>
                    </div>
                    <div className="card">
                    <div className="container" >
                        <h3>Условие</h3>
                        <p>{this.props.problems_list.get(Number(this.id)).task}</p>
                        <h4>Автор:</h4>
                        <p>{this.props.problems_list.get(Number(this.id)).author}</p>
                    </div>
                    </div>
                    <div className="container">
                        <Link to={`/solution_page/${this.id}`} className="btn btn-primary">Показать решение</Link>
                    </div>
                    <p></p>
                    <div className="container">
                    {this.props.user && this.props.user.login === this.props.problems_list.get(Number(this.id)).user && <div>
                        <Link to={`/edit/${this.id}`} className="btn btn-primary">Редактировать</Link>
                    </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        problems_list: state.userReducer.problems,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(problem_page);