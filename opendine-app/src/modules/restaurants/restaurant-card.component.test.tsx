// Write a react test for the restaurant card component

import { render, screen } from '@testing-library/react';
import RestaurantCard from './restaurant-card.component';
import { RestaurantDto } from './models/restaurant.model';

describe('RestaurantCard', () => {
  it('should render the restaurant card', () => {
    const restaurant: RestaurantDto = {
      restaurantId: 1,
      name: 'Test Restaurant',
      description: 'Test Description',
    };

    const { getByText, getAllByText } = render(<RestaurantCard restaurant={restaurant} />);

    expect(getByText(restaurant.name)).toBeInTheDocument();
    expect(getAllByText(restaurant.description)[0]).toBeInTheDocument();
  });
}); 