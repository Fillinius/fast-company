import React from 'react'
import NavBar from './components/ui/navBar'
import Users from './components/users'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './components/main'
import Login from './components/login'
import NotFound from './components/not-found'
import User from './components/page/userPage'
import UserEdit from './components/page/userEdit'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/users/:userId" component={User} />
        <Route path="/users/:userId/:edit?" component={UserEdit} />
        <Route path="/users" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/404" component={NotFound} />
        <Route path="/" component={Main} />
        <Redirect to="404" />
      </Switch>
      <ToastContainer />
    </div>
  )
}

export default App
//
