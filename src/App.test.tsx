import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@clover/data-layer', () => {
  return {
    __esModule: true,
    CloverDataLayer: ({ children }: any) => <div>{children}</div>,
  };
});

describe('<App />', () => {
  it('should render', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Scheduling Service/i })).toBeInTheDocument();
  });
});
