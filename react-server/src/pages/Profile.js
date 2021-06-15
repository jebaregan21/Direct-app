import React, { Component } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import domain from '../domain'
import history from '../history'
import NavBar from '../components/NormalNav'

class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loaded : false
        }
    }

    componentDidMount(){
        axios.get(`${domain}/profile/${this.props.match.params.id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                this.setState({
                    isLogged : true,
                    firstName:response.data.firstName,
                    userId : response.data.userId,
                    admin : response.data.admin,
                    data : response.data.data
                })
            }
            else{
                alert('Login to proceed')
                localStorage.clear()
                history.push('/')
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    componentDidUpdate(){
        document.title=this.state.data.firstName
        if(this.state.loaded===false)
            this.setState({loaded:true})
    }
    
    render() {
        return (
            (this.state.loaded===true)?
            <div className="container-fluid">
                <NavBar isLogged={this.state.isLogged} active="profile" firstName={this.state.firstName} userId={this.state.userId}></NavBar>
                <div class="col-12" style={{margin:"8%"}}>
                    <div class="d-flex  ">
                    <div class="mt-5 mb-3 text-center">
                        
                        {(this.state.admin===true)?
                        <img class="img-fluid rounded rounded-circle" src={`${domain}/pimage/${this.state.data._id}.jpg`}
                        style={{width: "120px", height: "120px"}} alt=""/>
                        :
                        null
                        }

                            </div>
                        <div class="d-flex  flex-column align-items-start  bd-highlight mb-3">
                            
                            <div class="p-0 m-2 ms-5 me-0 pe-0 bd-highlight fs-4">
                                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.data.firstName}
                            </div>
                            <div class="p-0 m-2 ms-5 me-0 pe-0 bd-highlight fs-4">
                                Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.data.email}
                            </div>
                            {(this.state.admin===true)?
                            <div class="p-0 m-2 ms-5 me-0 pe-0 bd-highlight fs-4">
                                Degree&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.data.degree}
                            </div>
                            :
                            null
                            }
                            
                            <div class="p-0 m-2 ms-5 me-0 pe-0 bd-highlight fs-4">Stream&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                : {this.state.data.stream}
                            </div>
                            <div class="p-0 m-2 ms-5 me-0 pe-0 bd-highlight fs-4">Institution&nbsp; : {this.state.data.institution}
                            </div>

                            <div class="p-0 m-3 ms-5 me-0 pe-0 bd-highlight fs-4">
                                <div class="d-flex flex-row bd-highlight mb-3">
                                    <div class="p-0 mt-4  bd-highlight">
                                        Courses&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                                    </div>&nbsp;
                                    <div class="p-0 m-0 bd-highlight">
                                        <div class="p-0 m-0 d-sm-flex flex-sm-row bd-highlight mb-3">
                                            {(this.state.data.courses.map((course,index)=>{ 
                                                return(
                                                    
                                                    <div class="p-0 m-1 bd-highlight">
                                                    <div class="border border-1 border-dark rounded">
                                                        <div class="text-center m-0 p-0">
                                                            <a href={`/course/${course}`}>
                                                            <img class="img-fluid img-thumbnail " src={`${domain}/cimage/${course}.jpg`}
                                                                style={{width: "150px" , height: "100px"}} alt=""/>
                                                            </a>
                                                            
                                                        </div>
                                                        </div>
                                                    </div>
                                                )

                                                })
                                            )}
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

export default Profile
