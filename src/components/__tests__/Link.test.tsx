import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Link from '../Link';

// Mock the useApp hook
jest.mock('../../contexts/AppContext', () => ({
  useApp: () => ({
    setActiveLink: jest.fn(),
  }),
}));

// Mock the useMediaQuery hook
jest.mock('@react-hook/media-query', () => ({
  useMediaQuery: () => true, // Desktop view
}));

describe('Link Component', () => {
  const mockSetSelectedPage = jest.fn();

  beforeEach(() => {
    mockSetSelectedPage.mockClear();
  });

  test('renders link with correct text', () => {
    render(
      <Link
        page="Work"
        selectedPage="Home"
        setSelectedPage={mockSetSelectedPage}
      />
    );
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  test('calls setSelectedPage when clicked', () => {
    render(
      <Link
        page="Work"
        selectedPage="Home"
        setSelectedPage={mockSetSelectedPage}
      />
    );
    
    fireEvent.click(screen.getByText('Work'));
    expect(mockSetSelectedPage).toHaveBeenCalledWith('Work');
  });

  test('applies active styles when selected', () => {
    render(
      <Link
        page="Work"
        selectedPage="Work"
        setSelectedPage={mockSetSelectedPage}
      />
    );
    
    const link = screen.getByText('Work');
    expect(link).toHaveClass('text-white');
  });

  test('applies inactive styles when not selected', () => {
    render(
      <Link
        page="Work"
        selectedPage="Home"
        setSelectedPage={mockSetSelectedPage}
      />
    );
    
    const link = screen.getByText('Work');
    expect(link).toHaveClass('text-gray-400');
  });

  test('prevents default link behavior', () => {
    render(
      <Link
        page="Work"
        selectedPage="Home"
        setSelectedPage={mockSetSelectedPage}
      />
    );
    
    const link = screen.getByText('Work');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
    
    fireEvent(link, clickEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
