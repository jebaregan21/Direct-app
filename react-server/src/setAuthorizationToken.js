import axios from 'axios'

function setAuthorizationToken(token){
    if(token){
        localStorage.setItem('token',token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthorizationToken