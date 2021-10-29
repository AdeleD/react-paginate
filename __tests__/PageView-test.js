/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, screen } from '@testing-library/react';
import PageView from '../react_components/PageView';

describe('PageView', () => {
  describe('link generation', () => {
    const labelBuilder = (page) => `page-${page}`;

    it('assigns a button role when there is no provided href', async () => {
      render(
        <PageView
          pageLabelBuilder={labelBuilder}
          getEventListener={() => jest.fn}
          pageSelectedHandler={jest.fn}
          page={1}
          selected={false}
        />
      );

      const item = await screen.findByRole('button');
      expect(item).toBeDefined();
    });

    it('does not assign a button role when an href is provided', async () => {
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
      const item = await screen.findByRole('link');
      expect(item).toBeDefined();
    });
  });
});
