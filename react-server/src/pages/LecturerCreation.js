import React, { Component } from 'react'
import axios from 'axios'
import domain from '../domain'
import history from '../history'
import ProgressBar from '../components/ProgressBar'

class LecturerCreation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            imagepreview : null,
            stream : 'cse',
            progress : 0
        }
    }

    componentDidMount(){
        document.title = "Create a lecturer account"
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


    onUploadProgress = progressEvent => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(this.state.progress)
        this.setState({progress : percentCompleted})
    }

    formSubmit = e =>{
        e.preventDefault()
        if((this.state.password === this.state.repassword) && (this.state.password!==null||this.state.password!==undefined)){
            let formData = new FormData()
            formData.append('firstName',this.state.firstName)
            formData.append('lastName',this.state.lastName)
            formData.append('email',this.state.email)
            formData.append('degree',this.state.degree)
            formData.append('password',this.state.password)
            formData.append('stream',this.state.stream)
            formData.append('institution',this.state.institution)
            formData.append('image',this.state.image)
            console.log(formData)
            axios.post(`${domain}/create/lecturer`,formData,this.onUploadProgress)
            .then(response=>{
                if(response.data.ok===true){
                    alert('account has been created')
                    history.push('/')
                }
                else{
                    alert(response.data.reason)
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    
    render() {
        return (
        <div class="container-fluid">
        <div class="row">

            <div class="col-12 bg-dark pt-2">
                <div class="col text-center ">
                    <h3 class="text-light ">Create Account</h3>
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
                                            <input type="text" class="form-control" id="lastName" name="lastName" onChange={this.dataSetter} required/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="email" class="form-label p-0">Email&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="email" name="email" onChange={this.dataSetter} required/>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="row mt-2 px-4 justify-content-left">

                                        <label for="password" class="form-label p-0">Password&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="password" name="password" onChange={this.dataSetter} required/>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="row mt-2  px-4 justify-content-left">
                                        <label for="confirmPassword" class="form-label p-0">Confirm Password&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="confirmPassword" name="repassword" onChange={this.dataSetter} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="degree" class="form-label p-0">Degree&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="degree" name="degree" onChange={this.dataSetter} required/>
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
                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="institution" class="form-label p-0">Institution&nbsp;<span
                                        class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="institution" name="institution" onChange={this.dataSetter} required/>
                            </div>

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
                                <button type="submit" class="btn btn-primary text-center">Create Account</button>
                            </div>
                            <div class="col-sm-12">
                                <ProgressBar progress={this.state.progress}></ProgressBar>
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

export default LecturerCreation
