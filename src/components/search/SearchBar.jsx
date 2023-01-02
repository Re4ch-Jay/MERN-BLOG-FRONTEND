import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './searchbar.css'

function SearchBar() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        	
        if(searchTerm) {
            navigate(`?title=${searchTerm}`)
        }
    }
  return (
    <div className='searchBar'>
        <form onSubmit={handleSearch} className="searchForm">
            <input className='searchInput' placeholder='Search...' type="text" onChange={e => setSearchTerm(e.target.value)} />
            <button type='submit' className='searchButton'>
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    </div>
  )
}

export default SearchBar