//import 'bootstrap/dist/css/bootstrap.min.css';

import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"

import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements
} from "react-router-dom";

import App from './App';
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./ProductScreen";
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const router=createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={<App/>}>
  <Route index={true} path="/" element={<HomeScreen/>}/>
  <Route  path="/products/:id" element={<ProductScreen/>}/>
  </Route>
  
  </>
  
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
