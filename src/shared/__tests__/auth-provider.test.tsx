import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { AuthProvider, useAuth } from '@/shared/provider/auth-provider';

function TestConsumer() {
  const { user, isLogin } = useAuth();
  return (
    <div>
      <span data-testid="name">{user?.name ?? ''}</span>
      <span data-testid="isLogin">{isLogin ? 'true' : 'false'}</span>
    </div>
  );
}
describe('AuthProvider', () => {
  test('provides null user and isLogin=false by default', () => {
    render(
      <AuthProvider initialUser={null}>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('name')).toHaveTextContent('');
    expect(screen.getByTestId('isLogin')).toHaveTextContent('false');
  });

  test('provides user and isLogin=true if initialUser passed', () => {
    render(
      <AuthProvider initialUser={{ name: 'John Doe' }}>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('name')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('isLogin')).toHaveTextContent('true');
  });
});
