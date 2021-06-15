import React, { Component } from 'react'
import axios from 'axios'
import domain from '../domain'
import NavBar from '../components/NormalNav'
import Loading from '../components/Loading'
import history from '../history'

class Video extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loaded:false
        }
    }

    componentDidMount(){
        axios.get(`${domain}/check/${this.props.match.params.id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                this.setState({
                    isLogged : true,
                    firstName:response.data.firstName,
                    userId : response.data.userId,
                    session : response.data.session
                })
            }
            else{
                localStorage.clear()
                alert('Login and try again')
                history.push('/')
            }
        })
    }

    componentDidUpdate(){
        document.title = this.state.session.title
        if(this.state.loaded===false)
            this.setState({loaded:true})
    }
    
    render() {
        return (
            (this.state.loaded===true)?
            <div class="container-fluid">
                <NavBar isLogged={this.state.isLogged} firstName={this.state.firstName} userId={this.state.userId}></NavBar>
                <div class="col-sm-10 mx-auto pt-sm-5 px-md-5 pt-3 mt-4"  >
                
                <video width="100%" controls>
                    <source src={`${domain}/video/${this.props.match.params.id}`} type="video/mp4"/>
                </video>
                
                <h4 class="text-left p-3 fs-3  fw-bold">{this.state.session.title}</h4>
                <p class="text-left p-3 fs-3">{this.state.session.description}</p>
                </div>
            </div>
            :
            <Loading></Loading>
        )
    }
}

export default Video
