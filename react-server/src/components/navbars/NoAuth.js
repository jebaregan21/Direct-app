import React, { Component } from 'react'

class NoAuth extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            search : null
        }
    }

    dataSetter = e => {
        this.setState({[e.target.name]:e.target.value})
    }

    onSearch = e =>{
        console.log(this.state.search)
        this.props.onSearch(this.state.search)
    }

    
    render() {
        return (
            <div class="row p-0 m-0 bg-dark fixed-top">
            <div class="col-12 p-0 m-0">
                <div class="d-block bg-dark text-light p-0 m-0">
                    <div class="d-md-flex flex-row  justify-content-center mt-1  p-0 m-0">
                        <div class="col-md-3">
                            <div class="d-flex flex-row justify-content-evenly">
                                <div class="p-2 pb-2 mb-1 fw-bold text-light fs-4">Direct</div>
                                <div class="p-2 mt-1 text-light bg-secondary mb-2"> <a class="linkdisable " href="/">Home</a>
                                </div>
                                <div class="dropdown text-center">
                                    <a class="p-2 mt-1 linkdisable dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        Login
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                        <li><a class="dropdown-item " href="/login/student">Student</a></li>
                                        <li><a class="dropdown-item" href="/login/lecturer">Lecturer</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mt-1">
                            <div class="d-sm-flex flex-row justify-content-sm-between p-1">

                                <input class="form-control ms-sm-5 me-2" type="search" name="search" placeholder="Search courses here"
                                    aria-label="Search" onChange={this.dataSetter}/>
                                <button class="btn btn-outline-light" type="submit" onClick={this.onSearch}>Search</button>
                                
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="d-flex flex-row justify-content-evenly">
                            <div class="dropdown text-center">
                                    <a class="p-2 mt-1 me-3 linkdisable dropdown-toggle" type="button"
                                        id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Create an account
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                        <li><a class="dropdown-item " href="/create/student">Student</a></li>
                                        <li><a class="dropdown-item" href="/create/lecturer">Lecturer</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default NoAuth
