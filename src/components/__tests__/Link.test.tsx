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
  let workSection: HTMLElement;
  const scrollIntoViewMock = jest.fn();

  beforeEach(() => {
    mockSetSelectedPage.mockClear();
    scrollIntoViewMock.mockClear();
    // jsdom does not implement Element.scrollIntoView — stub it so the
    // smooth-scroll call inside scrollToSection doesn't throw.
    Element.prototype.scrollIntoView = scrollIntoViewMock;
    // Link's handler uses scrollToSection, which looks up the target section
    // by id in the DOM. Add a `<section id="work">` to the test DOM so the
    // handler resolves it and runs the smooth-scroll + URL-clean path.
    // eslint-disable-next-line testing-library/no-node-access
    workSection = document.createElement('section');
    workSection.id = 'work';
    // eslint-disable-next-line testing-library/no-node-access
    document.body.appendChild(workSection);
  });

  afterEach(() => {
    // eslint-disable-next-line testing-library/no-node-access
    if (workSection.parentNode) {
      // eslint-disable-next-line testing-library/no-node-access
      workSection.parentNode.removeChild(workSection);
    }
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
    expect(link).toHaveClass('text-gray-300');
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

  test('does not add a hash fragment to the URL on click', () => {
    // beforeEach already creates <section id="work"> and stubs scrollIntoView.
    const initialHref = window.location.href;

    render(
      <Link
        page="Work"
        selectedPage="Home"
        setSelectedPage={mockSetSelectedPage}
      />
    );

    fireEvent.click(screen.getByText('Work'));

    // URL must be unchanged — no `#work` hash fragment added.
    expect(window.location.href).toBe(initialHref);
    expect(window.location.hash).toBe('');
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  test('removes a pre-existing hash fragment from the URL on click', () => {
    // Simulate a user who landed on `…/#about` and then clicks the Work nav
    // link — the existing `#about` should be stripped from the URL via
    // history.replaceState, leaving the URL clean.
    // eslint-disable-next-line no-restricted-globals
    window.history.replaceState(null, '', '#about');
    expect(window.location.hash).toBe('#about');

    render(
      <Link
        page="Work"
        selectedPage="Home"
        setSelectedPage={mockSetSelectedPage}
      />
    );

    fireEvent.click(screen.getByText('Work'));

    // After the click, the hash must be gone (history.replaceState was used,
    // so no new history entry was created and no popstate/hashchange fired).
    expect(window.location.hash).toBe('');
    expect(window.location.pathname + window.location.search).toBe(
      window.location.href.replace(window.location.origin, '')
    );
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    // Clean up: leave the URL as the test runner expects (no hash).
    // eslint-disable-next-line no-restricted-globals
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  });
});
