import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import MainPage, {loader as searchLoader} from './routes/mainpage'
import VideoPage, {loader as videoLoader} from './routes/videopage'
import Index, {loader as rootLoader} from './routes/index'
import Gerilim, {loader as gerilimLoader} from './routes/gerilim'
import Fantastik, {loader as fantastikLoader} from './routes/fantastik'
import Gizem, {loader as gizemLoader} from './routes/gizem'
import Dram, {loader as dramLoader} from './routes/dram'
import Komedi, {loader as komediLoader} from './routes/komedi'
import Aksiyon, {loader as aksiyonLoader} from './routes/aksiyon'
import ErrorComponent from './error';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainPage/>,
    errorElement: <ErrorComponent/>,
    loader: searchLoader,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: rootLoader
      },
      {
        path: "gerilim",
        element: <Gerilim/>,
        loader: gerilimLoader
      },
      {
        path: "komedi",
        element: <Komedi/>,
        loader: komediLoader
      },
      {
        path: "aksiyon",
        element: <Aksiyon/>,
        loader: aksiyonLoader
      },
      {
        path: "fantastik",
        element: <Fantastik/>,
        loader: fantastikLoader
      },
      {
        path: "gizem",
        element: <Gizem/>,
        loader: gizemLoader
      },
      {
        path: "dram",
        element: <Dram/>,
        loader: dramLoader
      }
    ]
  },  
  {
    path: "video/:id",
    element: <VideoPage/>,
    loader: videoLoader
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
