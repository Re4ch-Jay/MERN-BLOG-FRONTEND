import { useContext, useState } from 'react'
import './write.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Context} from '../../context/Context'

function Write() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [categories, setCategories] = useState('game');
    const [file, setFile] = useState(null);
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories: categories
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename

            try {
                await axios.post('https://blogcodewithreach-api.onrender.com/api/upload', data)
            } catch (error) {
                console.log(error)
            }

        }
        try {
            const res = await axios.post('https://blogcodewithreach-api.onrender.com/api/post', newPost)
            navigate(`/post/${res.data._id}`)
        } catch (error) {
            console.log(error)
        } 
    }
  return (
    <div className='write'>
        {file && (
            <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
        />
        )}
        <form className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput"><i class="writeIcon fa-solid fa-plus"></i></label>
                <input type="file" id='fileInput' onChange={e => setFile(e.target.files[0])} style={{display: 'none'}} />
                <input type="text"
                    placeholder='Title' 
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    className='writeInput'
                    autoFocus='true'
                />
            </div>
            <div className="writeFormGroup">
                <select id="categories" className='writeInput' onChange={e => setCategories(e.target.value)} value={categories}>
                    <option value="game">Game</option>
                    <option value="music">Music</option>
                    <option value="life">Life</option>
                    <option value="sport">Sport</option>
                </select>
            </div>
            <div className="writeFormGroup">
                <textarea 
                    className='writeInput writeText'
                    type="text" 
                    placeholder='Tell your story'
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                 ></textarea>
            </div>
         
            
            <button type='submit' className='writeSubmit'>Post Blog</button>
        </form>
    </div>
  )
}

export default Write