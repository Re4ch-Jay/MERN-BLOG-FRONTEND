import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
import {Context} from "../../context/Context"
import { useNavigate } from 'react-router-dom'

function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const {user, dispatch} = useContext(Context)
  const PF = "http://localhost:4000/images/"
  const navigate = useNavigate()

  const handleDelete = async () => {
    const res = await axios.delete(`https://blogcodewithreach-api.onrender.com/api/user/${user._id}`, {data: {userId: user._id}});
    if(res) {
      setDeleteModal(false)
      dispatch({type: "LOGOUT"})
      navigate('/')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id, username, email, password
    }
    if(file) {
        const data = new FormData()
        const filename = Date.now() + file.name;
        data.append('name', filename);
        data.append('file', file);
        updatedUser.profilePicture = filename

        try {
            await axios.post('/upload', data)
        } catch (error) {
            console.log(error)
        }
    }
    try {
      const res = await axios.put(`https://blogcodewithreach-api.onrender.com/api/user/${user._id}`, updatedUser)
      console.log(res)
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (error) {
      console.log(error)
      dispatch({type: "UPDATE_FAILURE", payload: error.response.data.error})
    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://blogcodewithreach-api.onrender.com/api/user/${user._id}`)
        console.log(res.data)
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        
      } catch (error) {
        console.log(error)
        
      }
    }
    fetchUser()
  }, [])

  return (
    <div className='settings'>
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle" onClick={() => setDeleteModal(true)}>Delete Account</span>
        </div>
        <form className='settingForm' onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settingProfilePicture">
          
              <img
                className='settingImg'
                src={file ? URL.createObjectURL(file) : PF+user.profilePicture}
                alt=""
              />
              
              <label htmlFor="fileInput"><i className="settingProfilePictureIcon fa-solid fa-user"></i></label>
              <input type="file" id="fileInput" onChange={e => setFile(e.target.files[0])} style={{display: 'none'}} />
          </div>
          <label>Username</label>
          <input type="text" placeholder='John Doe' value={username} onChange={e => setUsername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder='johndoe@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder='New Password' onChange={e => setPassword(e.target.value)} />
          <button className='settingSubmit' type='submit'>Update Profile</button>
        </form>
      </div>
      {deleteModal && (
        <div className="modal">
          <div className="modalTextTitle">
            Do you want to delete your account?
          </div>
          <div className="modalOption">
            <button className="modalYes" onClick={handleDelete}>
              Yes
            </button>
            <button className="modalNo" onClick={() => setDeleteModal(false)}>
              No
            </button>
          </div>
        </div>
      )}
      
      <Sidebar />
    </div>
  )
}

export default Settings