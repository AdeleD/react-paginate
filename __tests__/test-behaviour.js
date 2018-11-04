import React from 'react';
import ReactDOM from 'react-dom';

jest.dontMock('./../react_components/PaginationBoxView');
jest.dontMock('./../react_components/PageView');
jest.dontMock('./../react_components/BreakView');

import PaginationBoxView from './../react_components/PaginationBoxView';

import ReactTestUtils from 'react-dom/test-utils';

describe('Test pagination behaviour', () => {
  it('should display 6 elements to the left, 1 break element and 2 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView 
        initialPage={0}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector("li:first-child");
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector("li:last-child");

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll("li:not(.previous):not(.next)");
    elements.forEach(element => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (breakElementReached === true && element.className !== 'break') {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous disabled');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(6);
    expect(rightElements.length).toBe(2);
    expect(breakElements.length).toBe(1);
  });

  it('should display 7 elements to the left, 1 break element and 2 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView 
        initialPage={4}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector("li:first-child");
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector("li:last-child");

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll("li:not(.previous):not(.next)");
    elements.forEach(element => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (breakElementReached === true && element.className !== 'break') {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(7);
    expect(rightElements.length).toBe(2);
    expect(breakElements.length).toBe(1);
  });

  it('should display 2 elements to the left, 5 elements in the middle, 2 elements to the right and 2 break elements', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView 
        initialPage={5}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector("li:first-child");
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector("li:last-child");

    let leftElements = [];
    let middleElements = [];
    let rightElements = [];
    let breakElements = [];
    let leftBreakElementReached = false;
    let rightBreakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll("li:not(.previous):not(.next)");
    elements.forEach(element => {
      if (
        leftBreakElementReached === false && 
        rightBreakElementReached === false && 
        element.className !== 'break'
      ) {
        leftElements.push(element);
      } 
      else if (
        leftBreakElementReached === true && 
        rightBreakElementReached === false && 
        element.className !== 'break'
      ) {
        middleElements.push(element);
      } 
      else if (
        leftBreakElementReached === true && 
        rightBreakElementReached === true && 
        element.className !== 'break'
      ) {
        rightElements.push(element);
      } 
      else if (breakElements.length === 0 && element.className === 'break') {
        breakElements.push(element);
        leftBreakElementReached = true;
      } 
      else if (breakElements.length === 1 && element.className === 'break') {
        breakElements.push(element);
        rightBreakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(middleElements.length).toBe(5);
    expect(rightElements.length).toBe(2);
    expect(breakElements.length).toBe(2);
  });

  it('should display 2 elements to the left, 1 break element and 7 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView 
        initialPage={15}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector("li:first-child");
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector("li:last-child");

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll("li:not(.previous):not(.next)");
    elements.forEach(element => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (breakElementReached === true && element.className !== 'break') {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(rightElements.length).toBe(7);
    expect(breakElements.length).toBe(1);
  });

  it('should display 2 elements to the left, 1 break element and 6 elements to the right', () => {
    const pagination = ReactTestUtils.renderIntoDocument(
      <PaginationBoxView 
        initialPage={16}
        pageCount={20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
      />
    );

    const previousElement = ReactDOM.findDOMNode(pagination).querySelector("li:first-child");
    const nextElement = ReactDOM.findDOMNode(pagination).querySelector("li:last-child");

    let leftElements = [];
    let rightElements = [];
    let breakElements = [];
    let breakElementReached = false;

    const elements = ReactDOM.findDOMNode(pagination).querySelectorAll("li:not(.previous):not(.next)");
    elements.forEach(element => {
      if (breakElementReached === false && element.className !== 'break') {
        leftElements.push(element);
      } else if (breakElementReached === true && element.className !== 'break') {
        rightElements.push(element);
      } else {
        breakElements.push(element);
        breakElementReached = true;
      }
    });

    expect(previousElement.className).toBe('previous');
    expect(nextElement.className).toBe('next');
    expect(leftElements.length).toBe(2);
    expect(rightElements.length).toBe(6);
    expect(breakElements.length).toBe(1);
  });
});
