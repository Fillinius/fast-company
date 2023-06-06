import React, { useEffect } from 'react'
import NavBar from './components/ui/navBar'
import Users from './layouts/users'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import NotFound from './components/not-found'
import User from './components/page/userPage'
import UserEdit from './components/page/userEdit'
import { ToastContainer } from 'react-toastify'
import UserProvider from './hooks/useUsers'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <UserProvider>
          <Switch>
            <Route exact path="/users/:userId" component={User} />
            <Route path="/users/:userId/:edit?" component={UserEdit} />
            <ProtectedRoute path="/users" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logOut" component={LogOut} />
            <Route path="/404" component={NotFound} />
            <Route path="/" component={Main} />
            <Redirect to="404" />
          </Switch>
        </UserProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App
//
