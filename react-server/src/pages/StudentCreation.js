import React, { Component } from 'react'
import axios from 'axios'
import history from '../history'
const domain = require('../domain')

class StudentCreation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            stream : 'cse'
        }
    }

    componentDidMount(){
        document.title='Create a student account'
    }
    
    dataSetter = e=>{
        this.setState({[e.target.name]:e.target.value})
    }

    formSubmit = e=>{
        e.preventDefault()
        axios.post(`${domain}/create/student`,this.state)
        .then(response=>{
            console.log(response)
            if(response.data.ok===true){
                alert('Account has been successfully created')
                history.push('/')
            }
            else{
                alert(response.data.reason)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    render() {
        return (
            <div class="container-fluid">
        <div class="row">

            <div class="col-12 bg-dark">
                <div class="col text-center ">
                    <h3 class="text-light p-3">Register and join us !!!</h3>
                </div>
            </div>


            <div class="col-12">
                <div class="row px-5 justify-content-center">
                    <div class="col-lg-6 col-md-7">
                        <form onSubmit={this.formSubmit}>
                            <div class="row mt-3 p-0 ">
                                <div class="col-sm-6">
                                    <div class="row p-0 m-0 justify-content-left">
                                        <div class="col">
                                            <label for="firstName" class="form-label mt-1">First Name&nbsp;<span
                                                    class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="firstName" name="firstName" onChange={this.dataSetter} required/>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="row p-0 m-0 justify-content-left">
                                        <div class="col">
                                            <label for="lastName" class="form-label mt-1">Last Name&nbsp;<span
                                                    class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="lastName" name="lastName"onChange={this.dataSetter} required/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="email" class="form-label p-0">Email&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="email" name="email" onChange={this.dataSetter} required/>
                            </div>

                            <div class="row mt-2 px-4 justify-content-left">

                                <label for="password" class="form-label p-0">Password&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input type="password" class="form-control" id="password" name="password" onChange={this.dataSetter} required/>

                            </div>
                            <div class="row mt-2  px-4 justify-content-left">
                                <label for="confirmPassword" class="form-label p-0">Confirm Password&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input type="password" class="form-control" id="confirmPassword" name="repassword" onChange={this.dataSetter} required/>
                            </div>

                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="institution" class="form-label p-0">Institution&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="institution" name="institution" onChange={this.dataSetter} required/>
                            </div>


                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="stream" class="form-label p-0">Stream&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="input-group p-0 m-0">
                                    <select class="form-select" id="stream" defaultValue="Artificial Intelligence"
                                        aria-label="Example select with button addon" name="stream" onChange={this.dataSetter}>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Computer-Human Interface">Computer-Human Interface</option>
                                        <option value="Game Design">Game Design</option>
                                        <option value="Networks">Networks</option>
                                        <option value="Computer Graphics">Computer Graphics</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Programming Languages">Programming Languages</option>
                                        <option value="Software Engineering">Software Engineering</option>
                                        <option value="Mobile app development">Mobile app development</option>
                                    </select>

                                </div>
                            </div>

                            <div class="text-center p-4">
                                <button type="submit" class="btn btn-primary text-center">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }
}

export default StudentCreation
