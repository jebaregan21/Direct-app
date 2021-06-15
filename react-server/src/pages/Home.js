import NavBar from '../components/NavBar'
import CourseList from '../components/CourseList'
import axios from 'axios'
import domain from '../domain'
import Loading from '../components/Loading'

import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            courses : null,
            isLogged : false,
            loaded : false,
            firstName : null,
            userId : null
        }
    }
    
    courseListUpdater = (newData)=>{
        this.setState({courses:newData},
            console.log(this.state.courses))
    }

    componentDidMount(){
        document.title = "Home"
        axios.get(`${domain}/`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response =>{
            if(response.data.ok===true){
                this.setState({
                    courses : response.data.courses,
                    isLogged : true,
                    firstName : response.data.firstName,
                    userId : response.data.userId
                })  
            }
            else{
                localStorage.clear()
                this.setState({
                    courses : response.data.courses
                })
            }
        })
    }

    componentDidUpdate(){
        if(this.state.loaded===false)
            this.setState({loaded:true})
    }

    render() {
        return (
            (this.state.loaded===true)?
                <div>
                    <NavBar courseListUpdater={this.courseListUpdater}
                     isLogged={this.state.isLogged} firstName={this.state.firstName} userId={this.state.userId}
                     active="home"
                     />
                    <CourseList courses={this.state.courses}/> 
                </div>
                :
                <Loading></Loading>
        )
    }
}

export default Home
