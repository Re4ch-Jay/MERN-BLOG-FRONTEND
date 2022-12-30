import './home.css'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
function Home() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('');
  const location = useLocation()
  console.log(location)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("https://blogcodewithreach-api.onrender.com/api/post"+location.search)
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [location.search])
  return (
    <div>
      <div className='home'>
          <Posts posts={posts}/>
          <Sidebar />
      </div>
    </div>
  )
}

export default Home