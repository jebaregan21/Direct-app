import React, { Component } from 'react'
import MyCourseList from '../components/MyCourseList'
import NavBar from '../components/NormalNav'
import Loading from '../components/Loading'
import axios from 'axios'
import domain from '../domain'

class MyCourses extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loaded : false
        }
    }

    componentDidMount(){
        axios.get(`${domain}/mycourses`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response =>{
            console.log(response)
            if(response.data.ok===true){
                this.setState({
                    isLogged : true,
                    firstName:response.data.firstName,
                    userId : response.data.userId,
                    admin : response.data.admin,
                    courses : response.data.courses
                })
            }
            else{
                this.setState({loaded:true,isLogged:false})
                alert('something went wrong')
            }
        })
        document.title = 'Courses'
    }

    componentDidUpdate(){
        if(this.state.loaded===false){
            this.setState({loaded:true})
        }
    }
    
    render() {
        return (
            (this.state.loaded===true)?
            <div class="m-0 p-0">
                <NavBar isLogged={this.state.isLogged} active="mycourses" firstName={this.state.firstName} userId={this.state.userId}></NavBar>
                <MyCourseList admin={this.state.admin} courses={this.state.courses}></MyCourseList>
            </div>
            :
            <Loading></Loading>
        )
    }
}

export default MyCourses
