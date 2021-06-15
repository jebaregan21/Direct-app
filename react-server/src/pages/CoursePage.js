import React, { Component } from 'react'
import NavBar from '../components/NormalNav'
import axios from 'axios'
import Loading from '../components/Loading'
import domain from '../domain'
import history from '../history'

 class CoursePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loaded : false,
            registered : false
        }
    }

    componentDidMount(){
        axios.get(`${domain}/course/${this.props.match.params.id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            console.log(response)
            if(response.data.ok===true){
                this.setState({
                    isLogged : true,
                    course : response.data.course,
                    userId : response.data.userId,
                    firstName : response.data.firstName,
                    registered : response.data.registered
                })
            }
            else{
                this.setState({
                    course : response.data.course
                })
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    componentDidUpdate(){
        document.title = this.state.course.title
        if(this.state.loaded===false)
            this.setState({loaded:true})
    }

    courseRedirect = e =>{
        history.push(`/learn/${this.state.course._id}`)
    }
    
    register = e =>{
        axios.post(`${domain}/course/${this.state.course._id}`,{bool:null},{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push(`/course/${this.state.course._id}`)
            }
            else{
                alert(response.data.reason)
            }
        })
    }

    render() {
        return (
            (this.state.loaded===true)?
            <div class="container-fluid">
                <div class="row">
                <NavBar isLogged={this.state.isLogged} userId={this.state.userId} firstName={this.state.firstName}></NavBar>
                <div class="col-12">
                    <div class="card mb-3 mt-2">
                        <div class="row g-0 p-5">
                            <div class="col-sm-3 pt-sm-5">
                                <div class="row justify-content-center align-items-left  pt-sm-5">
                                    <img style={{maxWidth: "375px", maxHeight: "200px"}}
                                        class="mx-auto my-auto img-fluid rounded img-thumbnail p-3 rounded"
                                        src={`${domain}/cimage/${this.state.course._id}.jpg`} alt="Course"/>
                                </div>
                            </div>
                            <div class="col-sm-9 p-5">
                                <div class="card-body">
                                    <h1 class="card-title offset-md-0">{this.state.course.title}</h1>
                                    <br/><br/>
                                    <h3 class="">Description :</h3><br/>
                                    <p class="card-text ps-2">{this.state.course.description}</p>
                                    <br/>
                                    <div class="row">
                                        <div class="col-md-2">
                                        <div class="text-center">
                                        <img style={{width: "100px", height: "100px"}}
                                        class=" img-fluid rounded-circle  mb-4  rounded"
                                        src={`${domain}/pimage/${this.state.course.lecturer}.jpg`} alt="Lecturer"/>
                                        </div>
                                    </div>
                                    <div class="col-md-auto my-auto ms-2">
                                        <h5>Lecturer : <a href={`/profile/${this.state.course.lecturer}`}>{this.state.course.lecturerName}</a> </h5>
                                    </div></div>
                                    <br/><br/>
                                    <div class="text-center">
                                        {(this.state.registered===true)?
                                        <button type="button" class="btn btn-primary" onClick={this.courseRedirect}>Go to the course page</button>
                                        :
                                        <button type="button" class="btn btn-primary" onClick={this.register}>Register</button>
                                    }  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            :
            <Loading></Loading>
        )
    }
}

export default CoursePage
