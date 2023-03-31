import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from './ui/loginForm';
import RegisterForm from './ui/registerForm';

const Login = () => {
  const { type } = useParams
  const [formType, setFormType] = useState(type === "register" ? type : 'Login')
  const toggleFormType = () => {
    setFormType((prevState) => prevState === "register" ? "login" : "register")
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">

          {formType === "register"
            ? <>
              <h2>Register</h2>
              <RegisterForm />
              <p>Already have account <a role="button" onClick={toggleFormType}>Sing In</a></p>
            </>
            : <>
              <h2>Login</h2>
              <LoginForm />
              <p>Dont have account <a role="button" onClick={toggleFormType}>Sing Up</a></p>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Login;