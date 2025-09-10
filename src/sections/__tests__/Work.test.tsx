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

// Mock direct 3D preview import used by Work
jest.mock('../../components/3d/Simple3DPreview', () => ({
  __esModule: true,
  default: ({ onProjectClick }: any) => (
    <div data-testid="simple-3d">
      <button onClick={() => onProjectClick?.({})}>Click Project</button>
    </div>
  ),
}));

// Keep index mocks minimal if imported elsewhere
jest.mock('../../components/3d', () => ({
  __esModule: true,
  Project3DPreview: () => <div data-testid="3d-preview" />,
  Project3DShowcase: () => <div data-testid="3d-showcase" />,
  Project3DModal: () => null,
  Lazy3DWrapper: ({ children }: any) => <div data-testid="lazy-3d">{children}</div>,
}));

describe('Work Section', () => {
  test('renders work section with title', () => {
    render(<Work />);
    // The title is split across elements: "My" and "Projects"
    expect(screen.getByText('My')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
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
    // Should render technology buttons from courses data; allow multiple matches
    expect(screen.getAllByText(/next\.js/i).length).toBeGreaterThan(0);
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

  test('clicking project in 3D view opens project link', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null as any);
    render(<Work />);
    
    // Switch to 3D view first
    const toggleButton = screen.getByLabelText(/switch to 3d view/i);
    fireEvent.click(toggleButton);
    
    // Click on project in 3D showcase (mocked button)
    const projectButton = screen.getByText('Click Project');
    fireEvent.click(projectButton);
    
    expect(openSpy).toHaveBeenCalled();
    openSpy.mockRestore();
  });
});
