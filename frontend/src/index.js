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

import AdminRoute from "./components/AdminRoute"; // Importing AdminRoute component
// Import application components
import App from './App';
import CartScreen from "./screen/cartScreen";
import {HelmetProvider} from "react-helmet-async"
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/loginScreen";
import OrderListScreen from "./screen/Admin/OrderListScreen";
import OrderScreen from "./screen/orderScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Importing PayPalScriptProvider for PayPal integration
import PaymentScreen from "./screen/paymentScreen";
import PlaceOrderScreen from "./screen/placeOrderScreen";
import PrivateRoute from "./components/privateRoute";
import ProductEditScreen from "./screen/Admin/ProductEditScreen";
import ProductListScreen from "./screen/Admin/productListScreen";
import ProductScreen from "./screen/ProductScreen";
import ProfileScreen from "./screen/profileScreen";
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom/client';
import RegisterScreen from "./screen/RegisterScreen";
import ShippingScreen from "./screen/shippingScreen";
import UserEditScreen from "./screen/Admin/userEditScreen";
import UserListScreen from "./screen/Admin/userListScreen";
// Import Redux store configuration
import store from "./store";

// Create a BrowserRouter instance with defined routes
const router = createBrowserRouter(createRoutesFromElements(
  <>
    {/* Main App route */}
    <Route path="" element={<App/>}>
      {/* HomeScreen route */}
      <Route index={true} path="/" element={<HomeScreen/>}/>
      {/* ProductScreen route */}
      <Route path="/products/:id" element={<ProductScreen/>}/>
      <Route path="/cart" element={<CartScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/register" element={<RegisterScreen/>}/>

      {/* Make ShippingScreen a private route */}
      <Route path='' element={<PrivateRoute />}>
        <Route index={true} path="/" element={<PrivateRoute />}/>
        <Route path="/shipping" element={<ShippingScreen/>}/>
        <Route path="/payment" element={<PaymentScreen/>}/>
        <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="/profile" element={<ProfileScreen/>}/>
        <Route path="/search/:keyWord" element={<HomeScreen/>}/>
        <Route path="/page/:pageNumber" element={<HomeScreen/>}/>
        <Route path="/search/:keyWord/page/:pageNumber" element={<HomeScreen/>}/>
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path="/order/:id" element={<OrderScreen/>}/>
      </Route>

      {/* Make AdminRoute a route */}
      <Route path='' element={<AdminRoute/>}>
        <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
      <Route path="/admin/productlist" element={<ProductListScreen/>}/>
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
        <Route path="/admin/userlist" element={<UserListScreen/>}/>
        <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}/>
        <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen/>}/>
      </Route>

    </Route>
  </>
));

// Create a React root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    {/* Wrap the application with Redux Provider */}
    <Provider store={store}>
      {/* Provide the PayPalScriptProvider for PayPal integration */}
      <PayPalScriptProvider>
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
