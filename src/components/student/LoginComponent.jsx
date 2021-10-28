import React, { Component } from "react"

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


import "./student.css"
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationService from "./AuthenticationService.js"
import AuthenticatedRoute from "./AuthenticatedRoute.js"

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName : '',
            password : '',
            loginSuccess : false,
            showMessage : false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    loginClicked() {
        console.log(this.state)
        if(this.state.userName==='admin' && this.state.password==='admin') {
            AuthenticationService.registerSuccessful(this.state.userName)
            this.props.history.push(`/welcome/${this.state.userName}`)
            console.log('success')
            this.setState( {
                showMessage : true,
                loginSuccess : true
            })
        }else {
            console.log('Falied')
            this.setState( {
                showMessage : false,
                loginSuccess : false
            })
        }
    }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    User Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange}></input>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button onClick={this.loginClicked}>Login</button>
                    <br></br>
                    {this.state.showMessage ? (this.state.loginSuccess ? <div> Login Success </div>  : <div> Login Failed </div>) : 'Enter Credentials'}
                </div>
            </div>
        )
    } 
    
}

export default LoginComponent