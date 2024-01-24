import React, { useEffect, useState } from "react";
import { useLoaderData, Link , Outlet } from "react-router-dom";
import './index.css'
import {videos} from './data'

export async function loader() {
  return {videos}
}

export default function Index() {
  const {videos} = useLoaderData();

  return (
    <>
      {
        videos.map(video => {
          return (
            <Link to={`video/${video.id}`}>
              <div id="content-1">
                <div>
                  <img src={video.videoImg} className="thumbnail"/>
                </div>
                <p className="movie-name">{video.videoName}</p>
              </div>
            </Link>
         )
        })
      }
    </>
  )
}