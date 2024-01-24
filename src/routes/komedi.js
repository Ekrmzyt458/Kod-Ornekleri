import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import './index.css'
import {videos} from './data'

export async function loader() {
  const filteredVideos = videos.filter(video => video.genre === "Komedi")

  console.log(filteredVideos)

  return {filteredVideos}
}

export default function Komedi() {
  const {filteredVideos} = useLoaderData();

  return (
    <>
      {
        filteredVideos.map(video => {
          return (
            <Link to={`../video/${video.id}`}>
              <div id="content-1">
                <div>
                  <img src={video.videoImg} className="thumbnail"/>
                </div>
                <p className="movie-name">{video.videoName} {video.videoView} {video.releaseDate}</p>
              </div>
            </Link>
          )
        })
      }
    </>
  )
}