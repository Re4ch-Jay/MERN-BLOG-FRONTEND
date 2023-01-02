import './topbar.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useContext } from 'react';
import SearchBar from '../search/SearchBar';
function TopBar() {
  const PF = "http://localhost:4000/images/"
  const {user, dispatch} = useContext(Context);
  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className='top'>
      <div className="topLeft">
        <Link to="/">
          <div className='logo'> Code with Reach BLOG </div>
        </Link>
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-github"></i>
      </div>
      <div className="topCenter">
        <ul className='topList'>
          <Link to='/'><li className='topListItem'>HOME</li></Link>
          <Link to='/write'><li className='topListItem'>WRITE</li></Link>
          <li className='topListItem' onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        <Link to='/settings'>
          {
            user ? (
              <img
                className="topImg"
                src={user.profilePicture ? PF+user.profilePicture : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAAB6CAMAAACr3hCFAAAAP1BMVEWZmZn///+QkJCVlZWioqL7+/uNjY22trbz8/P29vbw8PCnp6fExMTV1dXh4eHHx8fn5+e8vLzPz8+tra3b29vqkdDdAAADuElEQVRoge2a2XLrIAyGMeAVL9j4/Z+1uHHaBgMSSzI+c/ivmotmvkgCbZAqVsO8rYoTLS7acZJ19DeRqP/q95UwLXLq+JupbfgcgzwAyEUHxtR/hGEW1AJwipLl/Qwzb5wAD2s0wRRhDJ2ifoJvCrK/kWEnbi+8eKQNOiQhDCvCCKcpeMgRwTP0Ao1wmCLAH2iGznYcfRD40MQyDEEA3xBbZoZwhAAIHEPNwxxxQiBjAscgYhA0hMzHMMYhaKHSB4ZBhhzKF7E2E0PNYxEIaTAhgWAYo81wCOENmEFGB8MhNuZgaJMYCIEzB8iQZgZtiDWdYU1kIKRLZeiTAvIQfGVDDFuyGQhPZRDJCPCNDTB0QAWLEXg8AYYtORwI7AyAoc2AQChwV/oZUlLFr5o5hSGmfLqKAaWln0FmCEktIIP7GaYcIUmI8Lc8fob4AupFPIUhPVk85D8YfobUvP2UP20BDHkQgBriH2DI5IsUhjvE5B3O5h3uqDvc1UMWX0BFzP1z9x1qmFvUckMGhtSatsoQEKm1fY4eB2wn39/rQdUkoudNT1tg8//+3h8eScEzEJUGwTLMQBINQbPMghKLiCwzsapPMcMEfz9qRrpHZ3CmEF+PmxXHeyPbrDh6Zs4yzsyrLgoBu8BA7lBixuYN4liGMEQkcczNEMZQSeRu8wch/05NWyJon8TQG7WgHWuNWTSfBAwoY2MZdEHTIHfN6m27ZvTOHXNBRzPo7g+KCkZWcFCfyFDVk/URyJOAtuEPUmLeouyqsbqENWQJtQHIIBdh75HqqSX075MUpj+J0ZEelFi8icPNUO9CG525+vZeTqvij/aDi3aZnRYYqfae2N1Hxckwn88dqLcmrbtu6HrvSTxnGFQ4rwwXQ/tTt1B4KYZA0Gpcv8bOMPxNDn5LAPrbNDNHq2FlkK/xHvjExoVwyBqbNgYD4bh7Y55/VbY1tQ3CwmCpo8Pe+TxVt5ZrxPJrLAzWdh9VpL/KXnFYBiJXhsWelmgb5o/a9T3X2ubC0LmSQdgTNMldGZZdLrMLg6eXoApXq+sfYouEJ8PlvjEZ/BPJBpUVu9XzutHSiZsMDi/+UijII7PyElgKbpMBnoFRPjrfztZy4QABuR4NgwE1bKCMr3NnctT9vAqGKXvNFtBgwI7hWEO5GrdZ6qTZd3LeRsUZsuK91P0GQ9AEjDHaPESDHhWaIyqDIcuMHBT3MnwEwZyaGh/z7G0g0cJQGApDYSgMhaEwFIbCUBgKQ2EoDIWhMPxPDF+Pwi6WoG7M1wAAAABJRU5ErkJggg=="
              }
                alt="profile picture"
              />
            )
            : (
              <ul className='topList'>
                <Link to='/login'><li className='topListItem'>Login</li></Link>
                <Link to='/register'><li className='topListItem'>Register</li></Link>
              </ul>
            )
          } 
          
        </Link>
          <SearchBar />
      </div>
    </div>
  )
}

export default TopBar