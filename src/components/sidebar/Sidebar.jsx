import { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './sidebar.css'
import { useContext } from 'react'
import { Context } from '../../context/Context'

function Sidebar() {
    const [categories, setCategories] = useState([])
    const {user} = useContext(Context)
    const PF = "http://localhost:4000/images/"
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("https://blogcodewithreach-api.onrender.com/api/categories")
            setCategories(res.data)
            console.log(res)
        }   
        fetchCategories()
    }, [])
    console.log(user)
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <div className="sidebarTitle">ABOUT ME</div>
            <img
                src={user ? PF+user.profilePicture : "https://images.unsplash.com/photo-1671533602071-7ed368cb01ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"}
                alt=""
            />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla sapiente ipsum veniam sunt dolorem modi assumenda ipsam quod numquam, !</p>
        </div>
        <div className="sidebarItem">
            <div className="sidebarTitle">CATEGORIES</div>
            <div className="sidebarList">

                {categories.map(cat => (
                    <Link to={`/?category=${cat.name}`} key={cat._id}>
                        <li className="sidebarListItem" >{cat.name}</li>
                    </Link>
                ))}
            </div>
        </div>
        <div className="sidebarItem">
            <div className="sidebarTitle">FOLLOW US</div>
            <div className="sidebarSocial">
                <i className="sideBarIcon fa-brands fa-square-facebook"></i>
                <i className="sideBarIcon fa-brands fa-square-twitter"></i>
                <i className="sideBarIcon fa-brands fa-square-instagram"></i>
                <i className="sideBarIcon fa-brands fa-square-github"></i>
            </div>
        </div>
    </div>
  )
}

export default Sidebar