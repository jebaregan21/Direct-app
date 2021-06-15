import React, { Component } from 'react'
import NoAuth from './navbars/NoAuth'
import Auth from './navbars/Auth'
import SideNav from './navbars/SideNav'
import history from '../history'
import NormalNav from './navbars/NormalNav'
import axios from 'axios'
import domain from '../domain'

class NavBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLogged : this.props.isLogged,
            userId : this.props.userId,
            firstName : this.props.firstName,
        }
    }

    setData = e=>{
        this.setState({[e.target.name] : e.target.value},console.log(this.state.search))
    }

    onSearch = (data)=>{
        console.log(data)
        axios.post(`${domain}/search/search`,{search : data})
        .then(response=>{
            if(response.data.ok===true){
                this.props.courseListUpdater(response.data.courses)
            }
            else{
                alert('Something went wrong')
            }
        })
    }

    logout = () =>{
        localStorage.clear()
        history.push('/')
    }


    render() {
        return (
            <div>
                {(this.state.isLogged===true)?
                <Auth onChange={this.setData} active={this.props.active} onSearch={this.onSearch} 
                userId={this.state.userId} firstName={this.state.firstName} logout={this.logout}/>
                :
                <NoAuth onChange={this.setData} active={this.props.active} onSearch={this.onSearch}/>
            }
                <SideNav courseListUpdater={this.props.courseListUpdater}></SideNav>
            </div>
        )
    }
}

export default NavBar
