import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../../context/Context'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {dispatch} = useContext(Context)

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username, email, password 
      })
      if(res) {
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        navigate('/')
      }
      console.log(res)
    } catch (error) {
      console.log(error.response.data.error)
      setError(error.response.data.error)
    }
    
  }
  return (
    <div className='register'>
        <div className="registerTitle">Register</div>
        <form className="registerForm" onSubmit={handleSubmit}>

            <label htmlFor="">Username</label>
            <input 
              type="text" 
              placeholder='Enter your username' 
              onChange={e => setUsername(e.target.value)}
              value={username}
            />

            <label htmlFor="">Email</label>
            <input 
              type="text" 
              placeholder='Enter your email'
              onChange={e => setEmail(e.target.value)}
              value={email}
               />

            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder='Enter your password' 
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            {error && <div className='error'>{error}</div>}
            <button type='submit' className='registerButton'>Register</button>
        </form>
        <div className="registerRegisterContainer">
            <p>Already have an account?</p>
            <button className='registerLogin'>
              <Link to='/login'>
                Login
              </Link>
            </button>
        </div>
    </div>
  )
}

export default Register