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
import UserProvider from './hooks/useUsers'
import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQuality'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './components/logOut'

function App() {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualityProvider>
          <ProfessionProvider>
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
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>

      <ToastContainer />
    </div>
  )
}

export default App
//
