import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../NotificationContext';

// Test component that uses the notification context
const TestComponent = () => {
  const { addNotification, showSuccess, showError } = useNotification();

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
    
    await screen.findByText('Test');
    await screen.findByText('Test message');
  });

  test('shows success notification', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    
    await screen.findByText('Success');
    await screen.findByText('Operation completed');
  });

  test('shows error notification', async () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );
    
    fireEvent.click(screen.getByText('Show Error'));
    
    await screen.findByText('Error');
    await screen.findByText('Something went wrong');
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
    
    // Fast-forward time inside act to avoid React state update warnings
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });
});
