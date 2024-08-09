import React, { Component, ComponentProps, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { RestaurantDto } from "./models/restaurant.model";
import { Grid, Paper } from '@mui/material';
import RestaurantCard from './restaurant-card.component';

import { useLoaderData } from 'react-router-dom';



export interface RestaurantGridProps {
  restaurants: RestaurantDto[];
}

const RestaurantsGrid = ({restaurants}: RestaurantGridProps) => {
  
  return (
    <Grid container spacing={3}>
      {restaurants?.map((restaurant, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper>
            <RestaurantCard restaurant={restaurant} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default RestaurantsGrid;
