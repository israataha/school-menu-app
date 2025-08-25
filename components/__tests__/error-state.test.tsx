import { fireEvent, render, screen } from '@testing-library/react-native';

import { MESSAGES } from '@/constants/messages';

import { ErrorState } from '../error-state';

describe('ErrorState', () => {
  it('should render error state with text', () => {
    const message = 'Server error';
    const { getByText } = render(<ErrorState message={message} />);

    expect(getByText(message)).toBeDefined();
    expect(screen.queryByText(MESSAGES.ERRORS.TRY_AGAIN)).toBeNull();
  });

  it('should render error state with text and retry button', () => {
    const message = 'Server error';
    const { getByText } = render(<ErrorState message={message} onRetry={() => {}} />);

    expect(getByText(message)).toBeDefined();
    expect(getByText(MESSAGES.ERRORS.TRY_AGAIN)).toBeDefined();
  });

  it('should call onRetry when retry button is pressed', () => {
    const message = 'Server error';
    const onRetry = jest.fn();
    const { getByText } = render(<ErrorState message={message} onRetry={onRetry} />);

    fireEvent.press(getByText(MESSAGES.ERRORS.TRY_AGAIN));

    expect(onRetry).toHaveBeenCalled();
  });
});
