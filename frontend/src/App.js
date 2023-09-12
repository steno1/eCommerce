// Importing the CSS styles for React Toastify.
import 'react-toastify/dist/ReactToastify.css';

// Importing necessary components and modules.
import { Container } from 'react-bootstrap'; // Importing a Bootstrap component.
import Footer from './components/Footer'; // Importing a custom Footer component.
import Header from './components/Header'; // Importing a custom Header component.
import { Outlet } from "react-router-dom"; // Importing the Outlet component from React Router.
import React from 'react'; // Importing the React library.
import { ToastContainer } from "react-toastify"; // Importing the ToastContainer component from React Toastify.

// Defining the main component, "App."
const App = () => {
  return (
    <>
      <Header /> {/* Rendering the Header component. */}
      <main className='py-3'>
        <Container>
          <Outlet /> {/* Rendering the content routed through the Router Outlet. */}
        </Container>
      </main>
      <Footer /> {/* Rendering the Footer component. */}
      <ToastContainer /> {/* Rendering the ToastContainer for displaying toasts. */}
    </>
  );
}

// Exporting the "App" component as the default export.
export default App;
