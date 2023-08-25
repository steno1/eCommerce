// Import Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';

// Import custom Bootstrap styles
import "./assets/styles/bootstrap.custom.css";
// Import global styles
import "./assets/styles/index.css";

// Import necessary components from libraries
import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements
} from "react-router-dom";

// Import application components
import App from './App';
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import Redux store configuration
import store from "./store";

// Create a BrowserRouter instance with defined routes
const router = createBrowserRouter(createRoutesFromElements(
  <>
    {/* Main App route */}
    <Route path="/" element={<App/>}>
      {/* HomeScreen route */}
      <Route index={true} path="/" element={<HomeScreen/>}/>
      {/* ProductScreen route */}
      <Route path="/products/:id" element={<ProductScreen/>}/>
    </Route>
  </>
));

// Create a React root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the application with Redux Provider */}
    <Provider store={store}>
      {/* Provide the router instance */}
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

