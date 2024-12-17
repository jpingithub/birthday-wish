import React from 'react';
import Welcome from "./pages/Welcome";
import AOS from "./pages/AOS";
import WishesComponent from './components/WishesComponent';
import '../src/styling/App.css';
import Wishes from './components/Wishes';
import WelcomeBlast from './components/WelcomeBlast';

function App() {
  return (
    <>
    <WelcomeBlast/>
      <Welcome />
      <AOS />
      <WishesComponent />
      <Wishes/>
    </>
  );
}

export default App;
