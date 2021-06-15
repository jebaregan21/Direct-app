import axios from 'axios'
import React, { Component } from 'react'
import domain from '../domain'
import ProgressBar from '../components/ProgressBar'
import history from '../history'

class CourseCreation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            stream : 'cse',
            imagepreview : null,
            image : null,
            progress : 0
        }
    }

    dataSetter = e=>{
        this.setState({[e.target.name]:e.target.value})
    }

    imageSetter = e=>{
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
    componentDidMount(){
        document.title = 'Create course'
    }

    onUploadProgress = progressEvent => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({progress : percentCompleted})
    }

    formSubmit = e =>{
        e.preventDefault()
        let form = new FormData()
        form.append('title',this.state.title)
        form.append('description',this.state.description)
        form.append('stream',this.state.stream)
        form.append('image',this.state.image)
        axios.post(`${domain}/create/course`,form,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}},this.onUploadProgress)
        .then(response=>{
            console.log(response)
            if(response.data.ok===true){
                alert('Course has been created successfully')
                history.push('/mycourses')
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
                        <h3 class="text-light p-3">Create your course !!!</h3>
                    </div>
                </div>
                <div class="col-12">
                    <div class="row px-5 justify-content-center">
                        <div class="col-lg-6 col-md-7 pt-5">
                            <form onSubmit={this.formSubmit}>
                                <div class="row mt-3 px-4 justify-content-left">
                                    <label for="title" class="form-label p-0">Course Title&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="title" name="title" onChange={this.dataSetter} required/>
                                </div>

                                <div class="row mt-3 px-4 justify-content-left">
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
                                <div class="row">
                                    <div class="col-sm-8 mt-3 px-4 justify-content-left">
                                        <label for="photo" class="form-label p-0 mt-2">Upload Course Image&nbsp;<span
                                                class="text-muted">(JPG format)</span>&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="file" class="form-control mt-2" id="photo" name="image" onChange={this.imageSetter} required/>
                                    </div>
                                    <div class="col-sm-4 text-center mt-4">
                                        {(this.state.imagepreview!=null)?
                                        <img class="img-fluid " src={this.state.imagepreview}
                                        style={{width: "150px",height: "100px"}} alt="CourseImage"/>
                                        :
                                        null
                                    } 
                                    </div>
                                </div>
                                <div class="row mt-3 px-4 justify-content-left">
                                    <label for="description" class="form-label p-0">Course Description</label>
                                    <textarea class="form-control" id="description" onChange={this.dataSetter} name="description" rows="3"></textarea>
                                </div>
                                <div class="text-center p-4">
                                    <button type="submit" class="btn btn-primary text-center">Create Course</button>
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

export default CourseCreation
