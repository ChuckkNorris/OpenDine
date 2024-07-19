import React, { useEffect } from 'react';
import logo from '../../logo.svg';
import './app.component.css';
import * as restaurantService from 'modules/restaurants/restaurants.service';
import { useLoaderData } from 'react-router-dom';

function App() {
  const restaurants = useLoaderData();
  console.warn("Loader data", restaurants);
  // const [restaurants, setRestaurants] = React.useState<any[]>([]);
  // useEffect(() => {
  //   restaurantService.getRestaurants().then((data) => {
  //     console.warn("DATA", data);
  //     setRestaurants(data);
  // })}, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
