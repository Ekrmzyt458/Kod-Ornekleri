import React, { useEffect, useState } from "react";
import { useLoaderData, Link , Outlet } from "react-router-dom";
import './index.css'
import { IoHomeOutline } from "react-icons/io5";
import {videos} from './data'

export async function loader() {
  return {videos}
}

export default function MainPage() {
  const {videos} = useLoaderData();
  const [click, setClick] = useState(false);
  const [loginStyle, setLoginStyle] = useState('loginpage');
  const [control, setControl] = useState('');
  const [style, setStyle] = useState('results-visible');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (control === '') {
      setStyle('results-nonvisible')
    }
    else {
      setStyle('results-visible')
    }
  },[control])
  
  useEffect(() => {
    if (searchTerm) {
      setControl(searchTerm)
    }
    else {
      setControl('')
    }
  }, [handleSearch])
  
  const handleClick = (event) => {
    setClick(true)
    event.preventDefault()
  }

  useEffect(() => {
    if (click === true) {
      setLoginStyle('loginpage')
    }
    else {
      setLoginStyle('loginpage-unvisible')
    }
  }, [click])


  return (
    <>
      <div id="header">
        <Link to={"/"}><p id="icon"><IoHomeOutline /></p></Link>
        <form>
          <div id="searchbox-div">
            <input id="searchbox" type="search" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearch}/>
            <div className={style}>
              {
                videos.map((video) => {
                  if (video.videoName.toLowerCase().match(searchTerm.toLowerCase())) {
                    return <Link to={`video/${video.id}`} className="video-results">{video.videoName}</Link>
                  }
                })
              }
            </div>
          </div>
        </form>
        <form>
          <button className="auth" onClick={handleClick}>Login</button>
          <button className="auth">Register</button>
        </form>
      </div>
      <div id={loginStyle}>
        <form id="loginform">
          <div><label>Username:</label><input type="text" placeholder="Username" className="credentials"/></div>
          <div><label>Password:</label><input type="password" placeholder="Password" className="credentials"/></div>  
          <input type="submit" id="submitbtn"/>
        </form>
        <label id="close" onClick={() => setClick(false)}>&#x2715;</label>
      </div>
      <div id="sidebar">
        <ul className="navbar">
          <li className="navbarlink"><Link to={"aksiyon"}>Aksiyon</Link></li>
          <li className="navbarlink"><Link to={"gerilim"}>Gerilim</Link></li>
          <li className="navbarlink"><Link to={"komedi"}>Komedi</Link></li>
          <li className="navbarlink"><Link to={"fantastik"}>Fantastik</Link></li>
          <li className="navbarlink"><Link to={"gizem"}>Gizem</Link></li>
          <li className="navbarlink"><Link to={"dram"}>Dram</Link></li>
        </ul>
      </div>
      <div id="main">
        <Outlet/>
      </div>
    </>
    
  )
}