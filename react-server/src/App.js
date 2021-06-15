import './App.css';
import Home from './pages/Home'
import {Router, Route, Switch} from 'react-router-dom'
import history from './history'
import CreateStudent from './pages/StudentCreation'
import CreateTeacher from './pages/LecturerCreation'
import LecturerLogin from './pages/LecturerLogin'
import StudentLogin from './pages/StudentLogin'
import MyCourses from './pages/MyCourses'
import CourseCreation from './pages/CourseCreation'
import Course from './pages/CoursePage'
import React, { Component } from 'react'
import Sessions from './pages/Sessions'
import Video from './pages/Video'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={() =><Home/>}></Route>
          <Route path="/create/student" exact component={() =><CreateStudent />}></Route>
          <Route path="/create/lecturer" exact component={() =><CreateTeacher/>}></Route>
            <Route path="/login/lecturer" exact component={() =><LecturerLogin/>}></Route>
            <Route path="/login/student" exact component={() =><StudentLogin/>}></Route>
            <Route path="/mycourses" exact component={() =><MyCourses/>}></Route>
            <Route path="/create/course" exact component={() =><CourseCreation/>}></Route>
            <Route path="/course/:id" exact component={(props) =><Course {...props}/>}></Route>
            <Route path="/learn/:id" exact component={(props) =><Sessions {...props}/>}></Route>
            <Route path="/video/:id" exact component={(props) =><Video {...props}/>}></Route>
            <Route path="/profile/:id" exact component={(props) =><Profile {...props}/>}></Route>
            <Route path="/settings" exact component={() =><Settings/>}></Route>
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App

