import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./student.css"
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationService from "./AuthenticationService.js"
import AuthenticatedRoute from "./AuthenticatedRoute.js"
import { Component } from "react";

import HelloWorldService from '../../api/student/HelloWorldService.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retreiveMessage = this.retreiveMessage.bind(this)
        this.retreiveMessage1 = this.retreiveMessage1.bind(this)
        this.handleError = this.handleError.bind(this)

        this.state = {
            welcomeMsg : '',
            welcomeMsg1 : '',
            errorMessage : ''
        }

        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }

    render() {
        return(
            <>
            <h1>Welcome!</h1>
            <div className="container">
             Welcome {this.props.match.params.name}. You can manage students data <a href="/student"> here </a>
            </div>

            <div className="container">
                Click here to get from BackEnd
                <button onClick={this.retreiveMessage}>Get Message</button>
            </div>

            <div className="container">
                Default Message: {this.state.welcomeMsg} <br/>
                Path Param Message: {this.state.welcomeMsg1} <br/>
                ErrorMessage: {this.state.errorMessage}
                
            </div>
        </>
        )
       
    }


    retreiveMessage() {
        console.log('Msg from BackEnd')
        //this.handleSuccessfulResponse1('abc')
        
        HelloWorldService.executeHelloWorldService()
        .then( respose => {
            console.log(respose);
            console.log(respose.data);
            this.setState({welcomeMsg : respose.data})
         } )

         HelloWorldService.executeHelloWorldServiceWithPathParam(this.props.match.params.name)
        .then( respose => {
            console.log(respose);
            console.log(respose.data);
            this.setState({welcomeMsg1 : respose.data})
         } )

         HelloWorldService.executeHelloWorldServiceWithException()
        .then( respose => {
            console.log(respose);
            console.log(respose.data);
            this.setState({errorMessage : respose.data})
         } )
         .catch(error =>  {
            console.log('Inside error')
            //console.log(error);
            //console.log(error.respose);
            this.setState({errorMessage : 'System Error.. Contact Admins'})
        } )

         

        console.log('display done');

    }

    retreiveMessage1() {
        console.log('Msg from BackEnd')
        //this.handleSuccessfulResponse1('abc')
        
        HelloWorldService.executeHelloWorldService()
        .then( respose => {
            console.log(respose);
            console.log(respose.data);
            // this.setState({welcomeMsg : respose.data})
         } )

        console.log('display done');

        HelloWorldService.executeHelloWorldService()
        .then( respose => {this.handleSuccessfulResponse(respose)} )

    }

    handleSuccessfulResponse(respose) {
        console.log('Inside handleSuccessfulResponse')
        this.setState({welcomeMsg : respose.data})
    }

    handleError(error) {
        console.log(error)
    }
    

}


export default WelcomeComponent