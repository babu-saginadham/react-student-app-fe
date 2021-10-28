import React, { Component } from "react"

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


import "./student.css"
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationService from "./AuthenticationService.js"
import AuthenticatedRoute from "./AuthenticatedRoute.js"

import LoginComponent from './LoginComponent.jsx'
import ListStudents from './ListStudents.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import StudentComponent from './StudentComponent.jsx'

class StudentApp extends Component{
    render() {
        return (
            <div className="StudentApp">
                {/*
                <LoginComponent></LoginComponent>
                <WelcomeComponent></WelcomeComponent>
                */}
                
                <Router>
                <>
                    <HeaderComponent/>
                    <Switch>
                        <Route path = "/" exact component={LoginComponent}/>
                        <Route path = "/login" component={LoginComponent}/>
                        <AuthenticatedRoute path = "/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/student/:sno" component = {StudentComponent}/>
                        <AuthenticatedRoute path="/student" component = {ListStudents}/>
                        <AuthenticatedRoute path="/logout" component = {LogoutComponent}/>
                        <Route path="" component = {ErrorComponent}></Route>
                    </Switch>
                    <FooterComponent/>
                </>
                </Router>
            </div>
        )
    }
}



class HeaderComponent extends Component{
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        console.log(isUserLoggedIn)
        return(
            <header>
              <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li className="nav-link"><Link className="nav-link" to="/welcome/admin">Home</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link className="nav-link" to="/student">Student Data Management</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isUserLoggedIn && <li className="nav-link"><Link className="nav-link" to="/login">Login</Link></li>}
                    {isUserLoggedIn && <li className="nav-link"><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render() {
        return(
            <footer className="footer">
                <span className="text-muted">All rights reserved</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render() {
        return(
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you for Using Application
                </div>
            </>
        )
    }
}


function ErrorComponent() {
    return <div>Invalid URL, Pls check the URL</div>
}

function ShowMessage(props) {
    console.log('showMessage')
    console.log(props)
    if(!props.loginSuccess) {
        return <div>Login Failed</div>
    }
    return null
}

export default StudentApp 