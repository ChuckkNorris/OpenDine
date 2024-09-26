import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app.component';
describe('App', () => {
  it('renders learn react link', () => {
    jest.mock('@azure/msal-react', () => ({ useMsal: jest.fn(), }));
    render(<App instance={{} as any} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});