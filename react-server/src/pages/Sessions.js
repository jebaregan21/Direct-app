import React, { Component } from 'react'
import NavBar from '../components/NormalNav'
import {Modal} from 'react-bootstrap'
import axios from 'axios'
import domain from '../domain'
import history from '../history'
import Loading from '../components/Loading'
import ProgressBar from '../components/ProgressBar'
import MyCourseList from '../components/MyCourseList'

class Sessions extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            progress : 0,
            loaded: false,
            show:false,
            isLogged:false,
            id : 'ida'
        }
    }
    
    componentDidMount(){
        axios.get(`${domain}/sessions/${this.props.match.params.id}`,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response=>{
            console.log(response)
            if(response.data.ok===true){
                this.setState({
                    sessions : response.data.sessions,
                    isLogged : true,
                    firstName:response.data.firstName,
                    userId : response.data.userId,
                    admin : response.data.admin
                })
            }
            else{
                localStorage.clear()
                history.push('/login/student')
            }
        })
        document.title = 'Start learning'
    }
    
    componentDidUpdate(){
        if(this.state.loaded===false)
            this.setState({loaded:true})
    }

    handleClose = e =>{
        this.setState({show:false})
    }

    handleOpen = e=>{
        this.setState({show:true})
    }

    dataSetter = e=>{
        this.setState({[e.target.name]:e.target.value})
    }

    videoSetter = e=>{
        this.setState({[e.target.name]:e.target.files[0]})
    }

    formSubmit = e =>{
        e.preventDefault()
        const options = {
            onUploadProgress: (progressEvent) => {
              const {loaded, total} = progressEvent
              let percent = Math.floor( (loaded * 100) / total )
              console.log( `${loaded}kb of ${total}kb | ${percent}%` );
      
              if( percent < 100 ){
                this.setState({ progress: percent })
              }
            }
          }
        let form = new FormData()
        form.append('title',this.state.title)
        form.append('description',this.state.description)
        form.append('video',this.state.video)
        axios.post(`${domain}/sessions/${this.props.match.params.id}`,form,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}},options)
        .then(response=>{
            if(response.data.ok===true){
                history.push(`/learn/${this.props.match.params.id}`)
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
            (this.state.loaded===true)?
            <div class="container-fluid m-0 p-0">
                <NavBar isLogged={this.state.isLogged} firstName={this.state.firstName} userId={this.state.userId}></NavBar>
                <div class="row p-0 m-0 mt-5 justify-content-center">
                    {(this.state.admin===true)?
                    <div class="bg-dark  fixed-bottom ">
                        <div class="row m-3">
                            <div class="col text-center ">
                                <button onClick={this.handleOpen} type="button"
                                    class="col p-2 pe-3 linkdisable  text-light bg-dark border border-2 border-light rounded-pill fw-bold fs-5">
                                    <i class="fs-5 fas fa-plus-circle  "></i>&nbsp;<span class="mb-1">Add a New Session</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    null
                    } 

                    <div class="col-7 m-1  p-1 mt-3 ">
                        <div class="row ">
                            <div class="col ">
                                {(this.state.sessions!==null)?
                                this.state.sessions.map((session,index)=>{
                                    return(
                                        <div class="accordion-item m-4">
                                            <h2 class="accordion-header border border-2 border-dark rounded" id="sessionOne">
                                                <button class=" border border-0 accordion-button collapsed" type="button"
                                                    data-bs-toggle="collapse" data-bs-target={`#${this.state.id}${index}`} aria-expanded="false"
                                                    aria-controls="collapseOne">
                                                    <div class="col fs-5  ">{session.title}</div>
                                                </button>
                                            </h2>
                                            <div id={`${this.state.id}${index}`} class="accordion-collapse collapse" aria-labelledby="sessionOne"
                                                data-bs-parent="#accordionExample">
                                                <div class="accordion-body border border-1  border-dark rounded-bottom">
                                                    <div class="d-flex justify-content-start flex-column">
                                                        <p>{session.description}</p>
                                                        <a href={`/video/${session._id}`} class="m-2 d-block linkdisable text-primary">Video</a>
                                                        <a href={`/quiz/${session._id}`} class="m-2 d-block linkdisable text-primary">Quiz</a>
                                                        <a href={`/assignment/${session._id}`} class="m-2 d-block linkdisable text-primary">Assignment</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                null
                            }
                                
                            </div>
                        </div>
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add a new session</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={this.formSubmit}>
                            <div class="row mt-3 p-0 ">
                                <div class="col-sm-12">
                                    <div class="row p-0 m-0 justify-content-left">
                                        <div class="col">
                                            <label for="title" class="form-label mt-1">Title&nbsp;<span
                                                    class="text-danger">*</span></label>
                                            <input type="text" class="form-control" name="title" onChange={this.dataSetter} required/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2 px-4 justify-content-left">
                                <label for="description" class="form-label p-0">Description&nbsp;<span
                                        class="text-danger">*</span></label>
                                <textarea class="form-control" name="description" onChange={this.dataSetter} required/>
                            </div>

                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="row mt-3 px-4 justify-content-left mt-2">
                                        <label for="video" class="form-label p-0">Upload the video&nbsp;<span
                                                class="text-muted">( .mp4 format)</span>&nbsp;<span
                                                class="text-danger">*</span></label>
                                        <input type="file" class="form-control mt-2 " name="video" onChange={this.videoSetter} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center p-4">
                                <button type="submit" class="btn btn-primary text-center">Upload</button>
                            </div>
                            <div class="col-sm-12">
                                <ProgressBar progress={this.state.progress}></ProgressBar>
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
            </div>:
            <Loading></Loading>
        )
    }
}

export default Sessions
