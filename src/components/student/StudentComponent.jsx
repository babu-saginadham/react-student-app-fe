import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, {Component} from 'react'

import StudentService from '../../api/student/StudentService.js'

class StudentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sno: this.props.match.params.sno,
            sname: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values){
        console.log(values)
        console.log(this.state.sno)
        if(this.state.sno != -1){
            console.log('Inside Update')
            StudentService.updateStudent(this.state.sno, {
                sno: this.state.sno,
                sname: values.sname
            })
            .then(
                () => {
                    this.props.history.push(`/student/`)
                }
            )
            
        }
        else {
            console.log('Inside Create')
            StudentService.createStudent( {
                sname: values.sname
            })
            .then(
                () => {
                    this.props.history.push(`/student/`)
                }
            )
        }
    }

    validate(values){
        console.log(values)
        let errors = {}
        if(!values.sname) {
            errors.sname = 'Enter Student Name'
        }else if(values.sname.length < 3){
            errors.sname = 'Enter Student Name have alteast 3 characters'
        }
        return errors
    }

    componentDidMount() {
        console.log('Inside componentDidMount')

        if(this.state.sno != -1){
    
            console.log(this.state.sname)
            StudentService.retrieveStudent(this.state.sno)
            .then(response => {
                console.log(response)
                this.setState({
                    sno: this.state.sno,
                    sname: response.data.sname
                })
            })
        }
    }

    render() {
        let {sno,sname} = this.state
        return (    
            <div>
                <h1>Manage Student {this.props.match.params.sno} Data</h1>
                <div className="container">
                    <Formik 
                        initialValues = {{sno,sname}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="sname" component="div" className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Student Name</label>
                                        <Field className="form-control" type="text" name="sname"></Field>
                                    </fieldset>
                                    <button className="btn btn-success">Save</button>
                                </Form>
                                
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default StudentComponent