import React, { Component } from 'react'
import axios from 'axios'
import domain from '../domain'
import history from '../history'
import setAuthorizationToken from '../setAuthorizationToken'
import './css/login.css'

class StudentLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount(){
        document.title = 'Student login'
    }

    valueSetter = e =>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    formHandler = e =>{
        e.preventDefault()
        axios.post(`${domain}/login/student`,this.state)
        .then(response=>{
            if(response.data.ok===true){
                setAuthorizationToken(response.data.token)
                history.push('/')
            }
            else{
                alert(response.data.reason)
            }
        })
    }

    render() {
        return (
            <div>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>Login Page</h2>
                        <p>Login as a student from here to access contents</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                        <div className="login-form">
                        <form onSubmit={this.formHandler}>
                            <div className="form-group m-3">
                                <label>Email</label>
                                <input type="text" className="form-control" placeholder="Email" name="email" onChange={this.valueSetter} required/>
                            </div>
                            <div className="form-group m-3">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.valueSetter} required/>
                            </div>
                            <div className="form-group m-3">
                                <button type="submit" className="btn btn-black">Login</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentLogin
