import React, { Component } from 'react'
import './css/settings.css'
import {Modal} from 'react-bootstrap'
import axios from 'axios'
import domain from '../domain'
import Loading from '../components/Loading'
import history from '../history'
import NavBar from '../components/NormalNav'

class Settings extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            mdegree : false,
            mstream : false,
            minstitution : false,
            mimage : false,
            loaded : false,
            imagepreview : null,
            mpassword : false,
            admin:false
        }
    }
    
    handleClose = e =>{
        this.setState({mdegree:false,mstream:false,minstitution:false,mimage:false,mpassword:false})
    }

    componentDidMount(){
        axios.get(`${domain}/settings`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
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
        document.title = 'Settings'
    }

    componentDidUpdate(){
        if(this.state.loaded===false)
            this.setState({loaded:true})
    }

    passwordFormSubmit = e =>{
        e.preventDefault()
        if(this.state.newpassword===this.state.repassword){
            axios.post(`${domain}/change/password`,{oldpassword : this.state.oldpassword,newpassword:this.state.newpassword},{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response=>{
                if(response.data.ok===true){
                    history.push('/settings')
                }
                else{
                    alert(response.data.reason)
                }
            }).catch(error=>{
                console.log(error)
            })
        }
        else{
            alert(`The new password and repassword are different`)
        }
        
    }

    degreeFormSubmit = e =>{
        e.preventDefault()
        axios.post(`${domain}/change/degree`,{degree:this.state.degree},{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/settings')
            }
            else{
                alert(response.data.reason)
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    imageFormSubmit = e =>{
        e.preventDefault()
        let form = new FormData()
        form.append('image',this.state.image)
        axios.post(`${domain}/change/image`,form,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/settings')
            }
            else{
                alert(response.data.reason)
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    streamFormSubmit = e =>{
        e.preventDefault()
        axios.post(`${domain}/change/stream`,{stream:this.state.stream},{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/settings')
            }
            else{
                alert(response.data.reason)
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    institutionFormSubmit = e =>{
        e.preventDefault()
        axios.post(`${domain}/change/institution`,{institution:this.state.institution},{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            if(response.data.ok===true){
                history.push('/settings')
            }
            else{
                alert(response.data.reason)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    dataSetter = e =>{
        this.setState({[e.target.name]:e.target.value})
    }

    imageSetter = e =>{
        if(e.target.files[0]===null || e.target.files[0]===undefined){
            this.setState({[e.target.name]:null})
        }
        else{
            this.setState({
                imagepreview:URL.createObjectURL(e.target.files[0]),
                [e.target.name]:e.target.files[0]
            })
        }
    }

    render() {
        return (
            (this.state.loaded===true)?
            <div className="container-fluid">
                <NavBar isLogged={this.state.isLogged}  firstName={this.state.firstName} userId={this.state.userId}></NavBar>
                <div class="col-12 " style={{marginTop:'7%'}}>
                    <div class="d-flex justify-content-center">
                    <div class="d-flex  flex-column align-items-start bd-highlight mb-3">
                        {(this.state.admin===true)?
                        <div class="mt-5 mb-3 text-center">
                            <div class="edit d-inline">
                            <img onClick={()=>this.setState({mimage:true})} class="img-fluid rounded rounded-circle" src={`${domain}/pimage/${this.state.userId}.jpg`}
                                style={{width: "120px" , height: "120px"}} alt=""/>
                            <div class="mt-1 promptt text-center text-primary">Click the image to change</div>   
                        </div> 
                        </div>
                        :
                        null
                        }
                        
                            

                            <div class="p-0 mb-4 mt-3 ms-5 me-0 pe-0 bd-highlight fs-4">
                                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.data.firstName}
                            </div>
                            <div class="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">
                                Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.data.email}
                            </div>
                            {(this.state.admin===true)?
                                <div class="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">
                                Degree&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.data.degree}&nbsp;&nbsp;<button class="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mdegree:true})} type="button"><i class=" text-primary bi bi-pencil-square"></i></button>
                            </div>
                            :
                            null
                            }
                            
                            <div class="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">Stream&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {this.state.data.stream}&nbsp;&nbsp;<button class="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mstream:true})} type="button"><i class=" text-primary bi bi-pencil-square"></i></button>
                            </div>
                            <div class="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">Institution&nbsp; : {this.state.data.institution}&nbsp;&nbsp;<button class="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({minstitution:true})} type="button"><i class="text-primary  bi bi-pencil-square"></i></button>
                            </div>
                            
                            <div class="p-0 ms-5 me-0 pe-0 bd-highlight "><button class="btn btn-light p-0 pb-3 mx-auto linkdisable text-primary " onClick={()=>this.setState({mpassword:true})} >Change Password&nbsp;&nbsp;<i class="bi bi-arrow-up-right-square"></i></button> 
                            </div>
                            

                        </div>


                    </div>


                </div>
                <Modal show={this.state.mdegree} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Change degree</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={this.degreeFormSubmit}>

                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="degree" class="form-label p-0">Degree&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input class="form-control" name="degree" type="text" onChange={this.dataSetter} required/>
                            </div>

                            <div class="text-center p-4">
                                <button type="submit" class="btn btn-primary text-center">Change</button>
                            </div>

                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <button class="btn btn-secondary" onClick={this.handleClose}>
                            Close
                        </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.mimage} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Change image</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={this.imageFormSubmit}>

                        <div class="row">
                                <div class="col-sm-8">
                                    <div class="row mt-3 px-4 justify-content-left mt-2">
                                        <label for="photo" class="form-label p-0">Upload Your Image&nbsp;<span
                                                class="text-muted">( JPG format)</span>&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="file" class="form-control mt-2 " name="image" id="photo" onChange={this.imageSetter} required/>
                                    </div>
                                </div>
                                <div class="col-sm-4 text-center mt-4">
                                    {(this.state.imagepreview===null)?
                                    null
                                    :
                                    <img class="img-fluid rounded rounded-circle" src={this.state.imagepreview}
                                        style={{width: "90px", height: "90px"}}  alt="profilepic"/>
                                    }
                                    
                                </div>
                            </div>
                            <div class="text-center p-4">
                                <button type="submit" class="btn btn-primary text-center">Change</button>
                            </div>

                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <button class="btn btn-secondary" onClick={this.handleClose}>
                            Close
                        </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.mstream} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Change stream</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={this.streamFormSubmit}>

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
                                <button type="submit" class="btn btn-primary text-center">Change</button>
                            </div>

                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <button class="btn btn-secondary" onClick={this.handleClose}>
                            Close
                        </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.mpassword} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Change password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={this.passwordFormSubmit}>
                        <div class="col-sm-12">
                                    <div class="row mt-2 px-4 justify-content-left">

                                        <label for="oldpassword" class="form-label p-0">Enter Old Password&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="password" class="form-control" name="oldpassword" onChange={this.dataSetter} required/>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="row mt-2 px-4 justify-content-left">

                                        <label for="newpassword" class="form-label p-0">New Password&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="password" class="form-control"  name="newpassword" onChange={this.dataSetter} required/>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="row mt-2  px-4 justify-content-left">
                                        <label for="confirmPassword" class="form-label p-0">Confirm Password&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="password" class="form-control" name="repassword" onChange={this.dataSetter} required/>
                                    </div>
                                </div>
                            <div class="text-center p-4">
                                <button type="submit" class="btn btn-primary text-center">Change</button>
                            </div>

                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <button class="btn btn-secondary" onClick={this.handleClose}>
                            Close
                        </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={this.state.minstitution} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Change institution</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={this.institutionFormSubmit}>

                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="institution" class="form-label p-0">Institution&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input class="form-control" name="institution" type="text" onChange={this.dataSetter} required/>
                            </div>

                            <div class="text-center p-4">
                                <button type="submit" class="btn btn-primary text-center">Change</button>
                            </div>

                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <button class="btn btn-secondary" onClick={this.handleClose}>
                            Close
                        </button>
                        </Modal.Footer>
                    </Modal>

            </div>
            :
            <Loading></Loading>
        )
    }
}

export default Settings
