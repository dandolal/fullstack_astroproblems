import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

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

                <div>

                    <div>
                        <h1>Я {this.props.problems_list.get(Number(this.id)).name} задача </h1>
                    </div>
                    <div>
                        <Link to={`/solution_page/${this.id}`} className="btn btn-primary">Решение</Link>
                    </div>
                    {this.props.user && this.props.user.login === this.props.problems_list.get(Number(this.id)).user && <div>
                        <Link to={`/edit/${this.id}`} className="btn btn-primary">Редактировать</Link>
                    </div>}
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