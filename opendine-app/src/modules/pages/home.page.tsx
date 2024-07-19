import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

const HomePage = () => {
  // const restaurants = useLoaderData();
  // console.warn("Loader data", restaurants);
  // const [restaurants, setRestaurants] = React.useState<any[]>([]);
  // useEffect(() => {
  //   restaurantService.getRestaurants().then((data) => {
  //     console.warn("DATA", data);
  //     setRestaurants(data);
  // })}, []);
  return (
    <div>
      Home!
    </div>
  );
}

export default HomePage;
