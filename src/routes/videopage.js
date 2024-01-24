import React, { useEffect, useState, useRef } from "react";
import { useLoaderData, Link , Outlet } from "react-router-dom";
import './index.css'
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { MdFullscreen } from "react-icons/md";
import { IoVolumeLowOutline, IoHomeOutline } from "react-icons/io5";
import { GrLike, GrDislike } from "react-icons/gr";
import {videos} from './data'

export async function loader({params}) {  
  const param = params.id
  const currentVideo = videos.find(video => video.id.toString() === param)

  const users = {
    id: "qwe",
    like: ["asdfa"],
    dislike: ["babylon"]
  }

  return {currentVideo, users, videos}
}

export default function VideoPage() {
  const {currentVideo, users, videos} = useLoaderData();
  const [click, setClick] = useState(false);
  const [loginStyle, setLoginStyle] = useState('loginpage');
  const [style, setStyle] = useState('results-visible');
  const [likes, setLikes] = useState(currentVideo.rating.like);
  const [isLiked, setIsLiked] = useState('like');
  const [isDisliked, setIsDisliked] = useState('dislike');
  const [dislikes, setDislikes] = useState(currentVideo.rating.dislike);
  const [searchTerm, setSearchTerm] = useState('');
  const [control, setControl] = useState('');

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

  const handleLike = (event) => {
    event.preventDefault()
    if (users.like.includes(currentVideo.videoName) && !users.dislike.includes(currentVideo.videoName)) {
      const index = users.like.indexOf(currentVideo.videoName);
      users.like.splice(index, 1);
      setLikes(currentVideo.rating.like -= 1);
      setIsLiked('like');
    } else if (!users.like.includes(currentVideo) && !users.dislike.includes(currentVideo.videoName)) {
      users.like.push(currentVideo.videoName)
      setLikes(currentVideo.rating.like += 1)
      setIsLiked('liked')
    }
  }

  const handleDislike = (event) => {
    event.preventDefault()
    if (users.dislike.includes(currentVideo.videoName) && !users.like.includes(currentVideo.videoName)) {
      const index = users.dislike.indexOf(currentVideo.videoName);
      users.dislike.splice(index, 1);
      setDislikes(currentVideo.rating.dislike -= 1);
      setIsDisliked('dislike')
    } else if (!users.dislike.includes(currentVideo) && !users.like.includes(currentVideo.videoName)) {
      users.dislike.push(currentVideo.videoName)
      setDislikes(currentVideo.rating.dislike += 1)
      setIsDisliked('disliked')
    }
  }

  useEffect(() => {
    if (users.like.includes(currentVideo)) {
      setIsLiked('liked')
      console.log("it works")
    } else {
      setIsLiked('like')
      console.log("it works but like")
    }
  }, [handleLike, handleDislike])

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
        <form id="loginform" method="post" action="http://localhost:3001/login">
          <div><label>Username:</label><input type="text" placeholder="Username" className="credentials" name="username"/></div>
          <div><label>Password:</label><input type="password" placeholder="Password" className="credentials" name="password"/></div>  
          <input type="submit" id="submitbtn"/>
        </form>
        <label id="close" onClick={() => setClick(false)}>&#x2715;</label>
      </div>
      <div id="videocontent">
        <div id="mainvideo">
          <div id="video">
            {<VideoPlayer video={currentVideo}/>}
          </div>
          <div id="description">
            <p id="title">{currentVideo.videoName}</p>
            <form>
              <label>{likes}</label> <button className={isLiked} onClick={handleLike}><GrLike /></button>
              <label>{dislikes}</label> <button className={isDisliked} onClick={handleDislike}><GrDislike /></button>
            </form>
          </div>
          <div id="info">
            <p id="konu">
              Konu: {currentVideo.info.konu}
            </p>
            <p>
              Oyuncular: {currentVideo.info.oyuncular}
            </p>
            <p>
              Yönetmen: {currentVideo.info.yönetmen}
            </p>
            <p>
              Ülke: {currentVideo.info.ülke}
            </p>
            <p>
              Tarih: {currentVideo.info.tarih}
            </p>
          </div>
          <div id="comments">
            <div id="make-comment">
              <img className="profile-photo" src="/assets/channel-12.jpeg"/>
              <form>
                <textarea id="comment-place" placeholder="Make a comment"></textarea>
              </form>
            </div>
            {
              currentVideo.comments.map(comment => {
                return (
                  <div className="comment">
                    <img className="profile-photo" src={comment.userPhoto}/>
                    <div className="comment-text">
                      <div>{comment.username}</div>
                      <div>{comment.comment}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

const VideoPlayer = ({video}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);
  const videoDivRef = useRef(null);
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };
  const handleDurationChange = () => {
    setDuration(videoRef.current.duration);
  };
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };
  const handleSeek = (event) => {
    videoRef.current.currentTime = event.target.value;
  };
  const handleFullscreen = () => {
    if(document.fullscreenElement){ 
      document.exitFullscreen() 
   } else { 
     videoDivRef.current.requestFullscreen();
   }
  }
  return (
    <div ref={videoDivRef} className="video-player-test">
      <video
        ref={videoRef}
        src={video.videoTrailer}
        id="video-element-test"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationChange}
        onClick={handlePlayPause}
      >
      </video>
      <div className="controls-test">
        <button className="play-pause-test" onClick={handlePlayPause}>{isPlaying ? <CiPause1 /> : <CiPlay1 />}</button>
        <input
          className="bar-test"
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span id="volume-icon"><IoVolumeLowOutline /></span>
        <input
        className="volume-test"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span id="video-time">{(currentTime / 60).toFixed(2)}/{(duration / 60).toFixed(2)}</span>
        <button id="fullscreen" onClick={handleFullscreen}><MdFullscreen /></button>
      </div>
    </div>
  );
};