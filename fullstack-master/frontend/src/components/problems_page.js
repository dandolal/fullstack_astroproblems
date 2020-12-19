import React from 'react';

import {problems_background, problem_card_style} from "./styles";
import {connect} from "react-redux";
import style from "./index.css"


const problem_card = (props) => {
    console.log(props.problem[1])
    return (
        <div className={style.card}>
            <div className="card" onClick={() => {
                props.history.push(`/problem/${props.problem[0]}`)
            }}>
                <div className="container">
                    <h3 style={{padding: '4px 8px'}}>{props.problem[1].name}</h3>
                    <p style={{marginLeft: 'auto', marginRight: 'auto'}}>{props.problem[1].task}</p>
                    <p>{props.problem[1].author}</p>
                </div>
            </div>
        </div>
    )
}


class problems_page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.problems_list) {
            return (<h1>Loading...</h1>)
        } else {
            console.log(this.props.problems_list)
            return (
                <div>


                    <div style={problems_background}>
                        <h1 style={{padding: '8px 16px', opacity: '1'}}>Задачи</h1>
                        <div>{Array.from(this.props.problems_list).map((problem, index) => (
                            problem_card({problem: problem, index: index, history: this.props.history})
                        ))}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        problems_list: state.userReducer.problems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(problems_page);