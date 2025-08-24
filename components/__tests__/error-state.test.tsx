import { fireEvent, render, screen } from '@testing-library/react-native';

import { ErrorState } from '../error-state';

describe('ErrorState', () => {
  it('should render error state with text', () => {
    const { getByText } = render(<ErrorState message="Server error" />);

    expect(getByText('Server error')).toBeDefined();
    expect(screen.queryByText('Try Again')).toBeNull();
  });

  it('should render error state with text and retry button', () => {
    const { getByText } = render(<ErrorState message="Server error" onRetry={() => {}} />);

    expect(getByText('Server error')).toBeDefined();
    expect(getByText('Try Again')).toBeDefined();
  });

  it('should call onRetry when retry button is pressed', () => {
    const onRetry = jest.fn();
    const { getByText } = render(<ErrorState message="Server error" onRetry={onRetry} />);

    fireEvent.press(getByText('Try Again'));

    expect(onRetry).toHaveBeenCalled();
  });
});
