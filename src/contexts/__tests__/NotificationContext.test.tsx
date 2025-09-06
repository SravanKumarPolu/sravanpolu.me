import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../NotificationContext';

// Test component that uses the notification context
const TestComponent = () => {
  const { addNotification, removeNotification, showSuccess, showError } = useNotification();

  return (
    <div>
      <button onClick={() => addNotification({ type: 'info', title: 'Test', message: 'Test message' })}>
        Add Notification
      </button>
      <button onClick={() => showSuccess('Success', 'Operation completed')}>
        Show Success
      </button>
      <button onClick={() => showError('Error', 'Something went wrong')}>
        Show Error
      </button>
    </div>
  );
};

describe('NotificationContext', () => {
  test('provides notification context to children', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    expect(screen.getByText('Add Notification')).toBeInTheDocument();
  });

  test('adds notification when addNotification is called', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    fireEvent.click(screen.getByText('Add Notification'));
    
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  test('shows success notification', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Operation completed')).toBeInTheDocument();
    });
  });

  test('shows error notification', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    fireEvent.click(screen.getByText('Show Error'));
    
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  test('auto-removes notification after duration', async () => {
    jest.useFakeTimers();
    
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    fireEvent.click(screen.getByText('Add Notification'));
    
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
    
    // Fast-forward time
    jest.advanceTimersByTime(5000);
    
    await waitFor(() => {
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });
});
