import React, { Component } from "react"

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


import "./student.css"
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationService from "./AuthenticationService.js"
import AuthenticatedRoute from "./AuthenticatedRoute.js"

import LoginComponent from './LoginComponent.jsx'

import StudentService from '../../api/student/StudentService.js'

class ListStudents extends Component {
    constructor(props){
        super(props)
        this.state = {
            //student: {id: 1, name:'Babu'}
            students : [],
            message : null

        }

        this.addStudent = this.addStudent.bind(this)
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        StudentService.retrieveStudents()
        .then(
            response => {
                console.log(response)
                this.setState({students : response.data})
            }
        )
    }

    deleteStudent(sno) {
        console.log('sno:', sno);
        StudentService.deleteStudent(sno)
        .then(response => {
            console.log('delete success')
            this.setState({
                message : `Student ${sno} deletion success`
            })
            this.refreshData()
        })
    }

    updateStudent(sno) {
        console.log('Update sno:', sno);
        this.props.history.push(`/student/${sno}`)
        
    }

    addStudent(){
        console.log('add')
        this.props.history.push(`/student/-1`)
    }

    render() {
        return ( 
        <div>
            <h1>Students Data</h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div> }
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 
                        <tr>
                            <td>{this.state.student.id}</td>
                            <td>{this.state.student.name}</td>
                        </tr>
                        */}

                        {
                            this.state.students.map (
                                student =>
                                <tr key={student.sno}>
                                    <td>{student.sno}</td>
                                    <td>{student.sname}</td>
                                    <td><button className="btn btn-success" onClick={() => this.updateStudent(student.sno)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteStudent(student.sno)}>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addStudent}>Add</button>
                </div>
            </div>
        </div>
        )
    }
}

export default ListStudents