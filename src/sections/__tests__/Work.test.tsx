import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Work from '../Work';

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

// Mock the useHaptic hook
jest.mock('../../hooks/useHaptic', () => ({
  useHaptic: () => ({
    triggerHaptic: jest.fn(),
  }),
}));

// Mock the useAnnouncement hook
jest.mock('../../components/AnnouncementSystem', () => ({
  useAnnouncement: () => ({
    announce: jest.fn(),
  }),
}));

// Mock the useScrollAnimation hook
jest.mock('../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    ref: { current: null },
    inView: true,
  }),
}));

// Mock the useAccessibility hook
jest.mock('../../hooks/useAccessibility', () => ({
  useAccessibility: () => ({
    shouldReduceMotion: false,
  }),
}));

// Mock the usePerformanceMonitor hook
jest.mock('../../hooks/usePerformanceMonitor', () => ({
  usePerformanceMonitor: jest.fn(),
}));

// Mock the useSwipeable hook
jest.mock('react-swipeable', () => ({
  useSwipeable: () => ({}),
}));

// Mock the 3D components
jest.mock('../../components/3d', () => ({
  Project3DShowcase: ({ onProjectChange, onProjectClick }: any) => (
    <div data-testid="3d-showcase">
      <button onClick={() => onProjectChange(1)}>Change Project</button>
      <button onClick={() => onProjectClick({ name: 'Test Project' })}>Click Project</button>
    </div>
  ),
  Project3DModal: ({ isOpen, onClose }: any) => 
    isOpen ? (
      <div data-testid="3d-modal">
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null,
  Lazy3DWrapper: ({ children }: any) => <div data-testid="lazy-3d">{children}</div>,
}));

describe('Work Section', () => {
  test('renders work section with title', () => {
    render(<Work />);
    expect(screen.getByText(/my projects/i)).toBeInTheDocument();
  });

  test('renders 3D toggle button', () => {
    render(<Work />);
    expect(screen.getByLabelText(/switch to 3d view/i)).toBeInTheDocument();
  });

  test('toggles between 2D and 3D view', () => {
    render(<Work />);
    const toggleButton = screen.getByLabelText(/switch to 3d view/i);
    
    // Initially in 2D view
    expect(screen.getByText(/3d view/i)).toBeInTheDocument();
    
    // Click to switch to 3D
    fireEvent.click(toggleButton);
    expect(screen.getByText(/2d view/i)).toBeInTheDocument();
  });

  test('renders technology filter buttons', () => {
    render(<Work />);
    // Should render technology buttons from courses data
    expect(screen.getByText(/next\.js/i)).toBeInTheDocument();
  });

  test('renders project navigation arrows', () => {
    render(<Work />);
    expect(screen.getByLabelText(/previous project/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next project/i)).toBeInTheDocument();
  });

  test('renders project counter indicators', () => {
    render(<Work />);
    // Should render project indicators based on current course projects
    const indicators = screen.getAllByLabelText(/go to project \d+/i);
    expect(indicators.length).toBeGreaterThan(0);
  });

  test('opens 3D modal when project is clicked', () => {
    render(<Work />);
    
    // Switch to 3D view first
    const toggleButton = screen.getByLabelText(/switch to 3d view/i);
    fireEvent.click(toggleButton);
    
    // Click on project in 3D showcase
    const projectButton = screen.getByText('Click Project');
    fireEvent.click(projectButton);
    
    // Modal should be open
    expect(screen.getByTestId('3d-modal')).toBeInTheDocument();
  });

  test('closes 3D modal when close button is clicked', () => {
    render(<Work />);
    
    // Switch to 3D view and open modal
    const toggleButton = screen.getByLabelText(/switch to 3d view/i);
    fireEvent.click(toggleButton);
    
    const projectButton = screen.getByText('Click Project');
    fireEvent.click(projectButton);
    
    // Close modal
    const closeButton = screen.getByText('Close Modal');
    fireEvent.click(closeButton);
    
    // Modal should be closed
    expect(screen.queryByTestId('3d-modal')).not.toBeInTheDocument();
  });
});
