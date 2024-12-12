import React from 'react';
import Welcome from "./pages/Welcome";
import AOS from "./pages/AOS";
import WishesComponent from './components/WishesComponent'; // Import the WishesComponent
import '../src/styling/App.css';

function App() {
  return (
    <>
      <Welcome />
      <AOS />
      <WishesComponent />
    </>
  );
}

export default App;
