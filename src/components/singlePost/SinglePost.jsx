import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import './singlePost.css'
import { Context } from '../../context/Context';

function SinglePost() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/')[2] // get ID
  const [post, setPost] = useState({})
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  const {user} = useContext(Context);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/post/" + path)
      console.log(res.data)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      console.log(res.data.desc)
    }
    getPost();
  }, [])
  const PF = "http://localhost:4000/images/"

  const handleDelete = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {data: {username: user.username}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/post/${post._id}`, {username: user.username, title, desc})
      setUpdateMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className='singlePost'>
      <div className="singlePostWrapper">
        {post.photo && (
          <img
          className="singlePostImg"
          src={PF + post.photo}
          alt=""
        />
        )}
        {
          updateMode ? <input onChange={e => setTitle(e.target.value)} type="text" value={title} className="singlePostTitleInput" autoFocus/> : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username &&
                <div  div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-sharp fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
              }
            
              </h1>
          )
        }
        
        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author: 
            <Link to={`/?username=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        
        {
          updateMode ? <textarea className='singlePostDescInput' onChange={e => setDesc(e.target.value)} value={desc}></textarea> : (
              <p className='singlePostDescInput' >
                          {desc}
              </p>
          )
        }
        {
          updateMode ? <button onClick={handleUpdate} className="singlePostButton">Update</button> : null
        }
        
      </div>
    
    </div>
  )
}

export default SinglePost