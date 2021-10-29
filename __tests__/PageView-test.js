import React from 'react';

import { render, screen } from '@testing-library/react';
import PageView from '../react_components/PageView';

describe('PageView', () => {
  describe('link generation', () => {
    const labelBuilder = (page) => `page-${page}`;

    it('assigns a button role when there is no provided href', () => {
      render(
        <PageView
          pageLabelBuilder={labelBuilder}
          getEventListener={() => jest.fn}
          pageSelectedHandler={jest.fn}
          page={1}
          selected={false}
        />
      );

      return screen.findByRole('button').then((item) => {
        expect(item).toBeDefined();
      });
    });

    it('does not assign a button role when an href is provided', () => {
      render(
        <PageView
          pageLabelBuilder={labelBuilder}
          getEventListener={() => jest.fn}
          pageSelectedHandler={jest.fn}
          page={1}
          selected={false}
          href="page/1"
        />
      );
      return screen.findByRole('link').then((item) => {
        expect(item).toBeDefined();
      });
    });
  });
});
