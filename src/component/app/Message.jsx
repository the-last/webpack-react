import React, { Component } from 'react';

class Message extends Component {
    constructor() {
        super();
        this.state = {
            arr : [0,1,2,3]
        }
    }
    handleClick(id) {
        let { arr } = this.state;
        arr.splice(id,1);
        console.log(arr, '更新后的')
        this.setState({
            arr
        })
    }
    handleAdd() {
        this.setState((prevState, props) => {
            return {
                age: prevState.arr.push(prevState.arr.length),
            };
        })
    }
    render() {
        return <div>
            <p>我是message <button onClick={this.handleAdd.bind(this)}>加一条</button> </p>
            {
                this.state.arr.map((item, flag) => {
                    return <li key={flag} onClick={this.handleClick.bind(this, flag)} >第 {item}个</li>
                })
            }
        </div>
    }
}

export default Message
