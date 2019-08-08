
import React, { Component } from 'react';
import axios from 'axios';

class FormDataFile extends Component {

    constructor (props) {
        super(props);
        this.state = {
            name: 'my-name'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { name }  =  this.state;

        
        let filetxt = document.getElementById('demoFile').files[0]
        let file_data = new FormData();
        file_data.append('file', filetxt);
        console.log('file_data', file_data);

        axios({
            method: 'post',
            url: '/api/formdata',
            data: file_data,
            config: {
                headers: {'Content-Type': 'multipart/form-data' }
            }
        }).then(res => {
            console.log(res, '请求');
        });
    }
    query3001 = () => {
        axios({
            method: 'post',
            url: '/api/list',
            data: {na: 'me'},
            config: {
                headers: {'Content-Type': 'application/json' }
            }
        }).then(res => {
            console.log(res, '请求list');
        });
    }
    render() {
        const { name } = this.state;
        return (
            <div style={{display:'block',width: '600px',margin: 'auto',border: '1px solid gray'}}>
                <form style={{display:'block',width: '500px',margin: 'auto',border: '1px solid gray'}} ref="form" onSubmit={this.handleSubmit} >
                    <input type='text' name="name" readOnly value={name}/><br />
                    <input multiple type='file' id="demoFile" name="myfile" /><br />

                    <input type="submit" value="Submit"/>
                </form>
                <button onClick={this.query3001} >query3001</button>
                <form style={{display:'block',width: '500px',margin: 'auto',border: '1px solid gray'}} ref="form" action="/api/formdata" method="post" >
                    <input type='text' name="name" readOnly value={name}/><br />
                    <input multiple type='file' id="demoFile" name="myfile" /><br />

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default FormDataFile;
