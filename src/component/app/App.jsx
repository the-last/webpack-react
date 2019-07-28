import React, { Component } from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';
import TableDeStore  from '../../store/TableDeStore';
import mboxDevtools from 'mobx-react-devtools';
const Devtools = mboxDevtools;



// Store for state
class Store {
  @observable next = 0;
  increaseNext = () => this.next +=1;
}

let store = new Store();

@observer
class MyComponent extends Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.store.next}</h1>
      </div>
    );
  }
}

class App extends Component {
    componentWillMount() {
        console.log('app --  componentWillMount')
    }

    componentDidMount() {
        console.log('app --  componentDidMount')
    }

    componentWillUnmount() {
        console.log('app --  componentWillUnmount')
    }
  render() {
    return (
      <div>
          <MyComponent
            store={store}
          />
        <button onClick={store.increaseNext}>
          Increase
        </button>
      </div>
    );
  }
}


@observer
class TableDe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            app: false,
            dataSource: [
                {
                  key: '1',
                  name: '胡彦斌',
                  age: 32,
                  address: '西湖区湖底公园1号',
                },
                {
                  key: '2',
                  name: '胡彦祖',
                  age: 42,
                  address: '西湖区湖底公园1号',
                }
            ]
        };
        this.store = new TableDeStore;
    }
    
    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    
    
    
    getColumns = () => {
        return [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }
        ];
    }

    render() {
        const { dataSource } = this.state;
        const { loading } = this.store;
        return (
            <div>
                {
                    this.state.app ? <App /> : null
                }
                <button onClick={() => { this.setState({ app: !this.state.app }) }}>我换</button>
                {/* <Devtools /> */}
                {loading}from store
                {/* <Table
                    dataSource={dataSource}
                    columns={this.getColumns()}
                ></Table> */}
            </div>
        )
    }
}

export default TableDe
