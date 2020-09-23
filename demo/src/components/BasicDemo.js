import React from 'react';
import ReactPaginate from 'react-paginate';

export const BasicDemo = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={onPageChange}
    containerClassName='pagination'
    pageClassName='page-item'
    pageLinkClassName='page-link'
    activeClassName='active'
    previousClassName='page-item'
    previousLinkClassName='page-link'
    nextClassName='page-item'
    nextLinkClassName='page-link'
    breakClassName='page-item'
    breakLinkClassName='page-link'
    previousLabel='previous'
    nextLabel='next'
    breakLabel='...'
  />
);
