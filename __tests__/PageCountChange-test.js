/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationBoxView from '../react_components/PaginationBoxView';

describe('resetOnPageCountChange', () => {
  it('recovers the displayed results and navigation after filtering removes the selected page', () => {
    const onPageChange = jest.fn();
    function FilteredResults() {
      const [itemCount, setItemCount] = useState(100);
      const [selected, setSelected] = useState(0);
      const items = Array.from({ length: itemCount }, (_, i) => i + 1);
      const visibleItems = items.slice(selected * 10, (selected + 1) * 10);

      return (
        <>
          <button onClick={() => setItemCount(50)}>Filter results</button>
          <output data-testid="results">{visibleItems.join(',')}</output>
          <PaginationBoxView
            pageCount={Math.ceil(itemCount / 10)}
            resetOnPageCountChange
            onPageChange={(event) => {
              onPageChange(event);
              setSelected(event.selected);
            }}
          />
        </>
      );
    }

    const { container } = render(<FilteredResults />);
    fireEvent.click(screen.getByText('9'));
    expect(screen.getByTestId('results').textContent).toBe(
      '81,82,83,84,85,86,87,88,89,90'
    );
    onPageChange.mockClear();

    fireEvent.click(screen.getByText('Filter results'));
    expect(container.querySelector('[aria-current="page"]').textContent).toBe(
      '1'
    );
    expect(screen.getByTestId('results').textContent).toBe(
      '1,2,3,4,5,6,7,8,9,10'
    );
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenLastCalledWith({ selected: 0 });
    expect(screen.getByText('Previous').getAttribute('aria-disabled')).toBe(
      'true'
    );
    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenLastCalledWith({ selected: 1 });
    expect(screen.getByTestId('results').textContent).toBe(
      '11,12,13,14,15,16,17,18,19,20'
    );
  });

  it.each([2, 3])(
    'preserves valid index %i when five pages become four',
    (initialPage) => {
      const onPageChange = jest.fn();
      const props = {
        initialPage,
        onPageChange,
        disableInitialCallback: true,
        resetOnPageCountChange: true,
      };
      const { container, rerender } = render(
        <PaginationBoxView {...props} pageCount={5} />
      );
      rerender(<PaginationBoxView {...props} pageCount={4} />);
      expect(container.querySelector('[aria-current="page"]').textContent).toBe(
        String(initialPage + 1)
      );
      expect(onPageChange).not.toHaveBeenCalled();
    }
  );

  it('recovers when the selected index equals the new page count', () => {
    const onPageChange = jest.fn();
    const props = {
      initialPage: 4,
      onPageChange,
      disableInitialCallback: true,
      resetOnPageCountChange: true,
    };
    const { container, rerender } = render(
      <PaginationBoxView {...props} pageCount={5} />
    );
    rerender(<PaginationBoxView {...props} pageCount={4} />);
    rerender(<PaginationBoxView {...props} pageCount={4} nextLabel="More" />);
    expect(container.querySelector('[aria-current="page"]').textContent).toBe(
      '1'
    );
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith({ selected: 0 });
  });

  it.each([undefined, false])(
    'preserves existing behavior with resetOnPageCountChange=%s',
    (resetOnPageCountChange) => {
      const onPageChange = jest.fn();
      const props = {
        initialPage: 8,
        onPageChange,
        disableInitialCallback: true,
        resetOnPageCountChange,
      };
      const { container, rerender } = render(
        <PaginationBoxView {...props} pageCount={10} />
      );
      rerender(<PaginationBoxView {...props} pageCount={5} />);
      expect(container.querySelector('[aria-current="page"]')).toBeNull();
      expect(onPageChange).not.toHaveBeenCalled();
    }
  );

  it('does not reset a selection when the page count grows', () => {
    const onPageChange = jest.fn();
    const props = {
      initialPage: 3,
      onPageChange,
      disableInitialCallback: true,
      resetOnPageCountChange: true,
    };
    const { container, rerender } = render(
      <PaginationBoxView {...props} pageCount={4} />
    );
    rerender(<PaginationBoxView {...props} pageCount={10} />);
    expect(container.querySelector('[aria-current="page"]').textContent).toBe(
      '4'
    );
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('honors a simultaneous forcePage update without a recovery callback', () => {
    const onPageChange = jest.fn();
    const props = { onPageChange, resetOnPageCountChange: true };
    const { container, rerender } = render(
      <PaginationBoxView {...props} pageCount={10} forcePage={8} />
    );
    rerender(<PaginationBoxView {...props} pageCount={5} forcePage={2} />);
    expect(container.querySelector('[aria-current="page"]').textContent).toBe(
      '3'
    );
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('leaves an unchanged forcePage under parent control', () => {
    const onPageChange = jest.fn();
    const props = { onPageChange, resetOnPageCountChange: true, forcePage: 8 };
    const { container, rerender } = render(
      <PaginationBoxView {...props} pageCount={10} />
    );
    rerender(<PaginationBoxView {...props} pageCount={5} />);
    expect(container.querySelector('[aria-current="page"]')).toBeNull();
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('treats forcePage=0 as controlled even after user navigation', () => {
    const onPageChange = jest.fn();
    const props = { onPageChange, resetOnPageCountChange: true, forcePage: 0 };
    const { container, rerender } = render(
      <PaginationBoxView {...props} pageCount={10} />
    );
    fireEvent.click(screen.getByText('9'));
    onPageChange.mockClear();
    rerender(<PaginationBoxView {...props} pageCount={5} />);
    expect(container.querySelector('[aria-current="page"]')).toBeNull();
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('waits for a nonempty page range before recovering after zero results', () => {
    const onPageChange = jest.fn();
    const props = {
      initialPage: 8,
      onPageChange,
      disableInitialCallback: true,
      resetOnPageCountChange: true,
      renderOnZeroPageCount: null,
    };
    const { container, rerender } = render(
      <PaginationBoxView {...props} pageCount={10} />
    );
    rerender(<PaginationBoxView {...props} pageCount={0} />);
    expect(container.querySelector('[role="navigation"]')).toBeNull();
    expect(onPageChange).not.toHaveBeenCalled();
    rerender(<PaginationBoxView {...props} pageCount={5} />);
    expect(container.querySelector('[aria-current="page"]').textContent).toBe(
      '1'
    );
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith({ selected: 0 });
  });

  it('can recover without an onPageChange callback', () => {
    const props = {
      initialPage: 8,
      disableInitialCallback: true,
      resetOnPageCountChange: true,
    };
    const { container, rerender } = render(
      <PaginationBoxView {...props} pageCount={10} />
    );
    rerender(<PaginationBoxView {...props} pageCount={1} />);
    expect(container.querySelector('[aria-current="page"]').textContent).toBe(
      '1'
    );
    expect(screen.getByText('Previous').getAttribute('aria-disabled')).toBe(
      'true'
    );
    expect(screen.getByText('Next').getAttribute('aria-disabled')).toBe('true');
  });
});
