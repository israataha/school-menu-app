import { render } from '@testing-library/react-native';

import { LoadingIndicator } from '../loading-indicator';

describe('LoadingIndicator', () => {
  it('should render LoadingIndicator with text', () => {
    const { getByText } = render(<LoadingIndicator text="Loading..." />);

    expect(getByText('Loading...')).toBeDefined();
  });
});
