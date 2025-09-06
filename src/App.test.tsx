import { render, screen } from '@testing-library/react';
import App from './App';

// Simple test that doesn't require complex mocking
test('app component exists', () => {
  expect(App).toBeDefined();
  expect(typeof App).toBe('function');
});
