import axios from 'axios'
import React, { Component } from 'react'
import domain from '../../domain'

class SideNav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             stream : null,
             lecturer : null
        }
    }

    dataSetter = e =>{
        this.setState({[e.target.name]:e.target.value})
    }

    formSubmit = e=>{
        e.preventDefault()
        let form = {
            stream : this.state.stream,
            lecturer : this.state.lecturer
        }
        console.log(form)
        axios.post(`${domain}/search/filter`,form)
        .then(response=>{
            if(response.data.ok===true){
                this.props.courseListUpdater(response.data.courses)
            }
            else{
                alert('Something went wrong')
            }
        }).catch(error=>{
            console.log(error)
            alert('Something went wrong')
        })

    }
    
    render() {
        return (
            <div class="col-2 fixed-top" style={{marginTop:"7%"}}>
            <div class="d-flex flex-column bd-highlight mb-3 p-4 bg-dark border border-1 rounded">
                <form class="form-container" onSubmit={this.formSubmit}>
                    <div class="form-group m-1 mb-3 mt-3">
                        <input class="form-control" onChange={this.dataSetter} type="text" name="lecturer" placeholder="Search by lecturer name"/>
                    </div>
                    <div class="form-group m-1 mb-3">
                        <label class="text-light">Stream:</label>
                        <select class="form-select" id="stream" defaultValue={null} aria-label="Example select with button addon" name="stream" onChange={this.dataSetter}>
                                <option value={null}>Choose stream</option>
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
                    <button type="submit" class="btn btn-warning">Filter</button>
                </form>
            </div>
        </div>
        )
    }
}

export default SideNav
