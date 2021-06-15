import React, { Component } from 'react'
import NormalNavAuth from './navbars/NormalNav'
import NormalNavUnauth from './navbars/NormalNavUnauth'
import history from '../history'

class NormalNav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isLogged : this.props.isLogged,
            firstName : this.props.firstName,
            userId : this.props.userId,
            active : this.props.active
        }
    }


    logout = () =>{
        localStorage.clear()
        history.push('/')
    }

    render() {
        return (
            <div>
                {(this.state.isLogged===true)?<NormalNavAuth userId={this.state.userId} active={this.state.active} firstName={this.state.firstName} logout={this.logout}/>:
                <NormalNavUnauth />
            }
            </div>
        )
    }
}

export default NormalNav
