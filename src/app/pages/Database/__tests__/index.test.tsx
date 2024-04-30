import * as React from 'react';
import { render } from '@testing-library/react';

import { Database } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<Database  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Database />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
