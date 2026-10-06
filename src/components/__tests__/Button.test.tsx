import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomButton as Button } from '../ui/Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct variant classes', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-600');
  });

  test('applies correct size classes', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  test('shows loading state', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders icon when provided', () => {
    const icon = <span data-testid="icon">🚀</span>;
    render(<Button icon={icon}>Button with Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
