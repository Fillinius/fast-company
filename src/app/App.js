import React from 'react'
import NavBar from './components/navBar'
import Users from './components/users'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './components/main'
import Login from './components/login'
import NotFound from './components/not-found'
import User from './components/user'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users" component={Users} />

        <Route path="/404" component={NotFound} />
        <Redirect to="404" />
      </Switch>
    </div>
  )
}

export default App
