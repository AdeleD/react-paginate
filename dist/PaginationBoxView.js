'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PageView = require('./PageView');

var _PageView2 = _interopRequireDefault(_PageView);

var _BreakView = require('./BreakView');

var _BreakView2 = _interopRequireDefault(_BreakView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationBoxView = function (_Component) {
  _inherits(PaginationBoxView, _Component);

  function PaginationBoxView(props) {
    _classCallCheck(this, PaginationBoxView);

    var _this = _possibleConstructorReturn(this, (PaginationBoxView.__proto__ || Object.getPrototypeOf(PaginationBoxView)).call(this, props));

    _this.handlePreviousPage = function (evt) {
      var selected = _this.state.selected;

      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      if (selected > 0) {
        _this.handlePageSelected(selected - 1, evt);
      }
    };

    _this.handleNextPage = function (evt) {
      var selected = _this.state.selected;
      var pageCount = _this.props.pageCount;


      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      if (selected < pageCount - 1) {
        _this.handlePageSelected(selected + 1, evt);
      }
    };

    _this.handlePageSelected = function (selected, evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      if (_this.state.selected === selected) return;

      _this.setState({ selected: selected });

      // Call the callback with the new selected item:
      _this.callCallback(selected);
    };

    _this.handleBreakClick = function (index, evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

      var selected = _this.state.selected;


      _this.handlePageSelected(selected < index ? _this.getForwardJump() : _this.getBackwardJump(), evt);
    };

    _this.callCallback = function (selectedItem) {
      if (typeof _this.props.onPageChange !== 'undefined' && typeof _this.props.onPageChange === 'function') {
        _this.props.onPageChange({ selected: selectedItem });
      }
    };

    _this.pagination = function () {
      var items = [];
      var _this$props = _this.props,
          pageRangeDisplayed = _this$props.pageRangeDisplayed,
          pageCount = _this$props.pageCount,
          marginPagesDisplayed = _this$props.marginPagesDisplayed,
          breakLabel = _this$props.breakLabel,
          breakClassName = _this$props.breakClassName,
          breakLinkClassName = _this$props.breakLinkClassName;
      var selected = _this.state.selected;


      if (pageCount <= pageRangeDisplayed) {
        for (var index = 0; index < pageCount; index++) {
          items.push(_this.getPageElement(index));
        }
      } else {
        var leftSide = pageRangeDisplayed / 2;
        var rightSide = pageRangeDisplayed - leftSide;

        // If the selected page index is on the default right side of the pagination,
        // we consider that the new right side is made up of it (= only one break element).
        // If the selected page index is on the default left side of the pagination,
        // we consider that the new left side is made up of it (= only one break element).
        if (selected > pageCount - pageRangeDisplayed / 2) {
          rightSide = pageCount - selected;
          leftSide = pageRangeDisplayed - rightSide;
        } else if (selected < pageRangeDisplayed / 2) {
          leftSide = selected;
          rightSide = pageRangeDisplayed - leftSide;
        }

        var _index = void 0;
        var page = void 0;
        var breakView = void 0;
        var createPageView = function createPageView(index) {
          return _this.getPageElement(index);
        };

        for (_index = 0; _index < pageCount; _index++) {
          page = _index + 1;

          // If the page index is lower than the margin defined,
          // the page has to be displayed on the left side of
          // the pagination.
          if (page <= marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          }

          // If the page index is greater than the page count
          // minus the margin defined, the page has to be
          // displayed on the right side of the pagination.
          if (page > pageCount - marginPagesDisplayed) {
            items.push(createPageView(_index));
            continue;
          }

          // If the page index is near the selected page index
          // and inside the defined range (pageRangeDisplayed)
          // we have to display it (it will create the center
          // part of the pagination).
          if (_index >= selected - leftSide && _index <= selected + rightSide) {
            items.push(createPageView(_index));
            continue;
          }

          // If the page index doesn't meet any of the conditions above,
          // we check if the last item of the current "items" array
          // is a break element. If not, we add a break element, else,
          // we do nothing (because we don't want to display the page).
          if (breakLabel && items[items.length - 1] !== breakView) {
            breakView = _react2.default.createElement(_BreakView2.default, {
              key: _index,
              breakLabel: breakLabel,
              breakClassName: breakClassName,
              breakLinkClassName: breakLinkClassName,
              onClick: _this.handleBreakClick.bind(null, _index)
            });
            items.push(breakView);
          }
        }
      }

      return items;
    };

    var initialSelected = void 0;
    if (props.initialPage) {
      initialSelected = props.initialPage;
    } else if (props.forcePage) {
      initialSelected = props.forcePage;
    } else {
      initialSelected = 0;
    }

    _this.state = {
      selected: initialSelected
    };
    return _this;
  }

  _createClass(PaginationBoxView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialPage = _props.initialPage,
          disableInitialCallback = _props.disableInitialCallback,
          extraAriaContext = _props.extraAriaContext;
      // Call the callback with the initialPage item:

      if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
        this.callCallback(initialPage);
      }

      if (extraAriaContext) {
        console.warn('DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead.');
      }
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (typeof nextProps.forcePage !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
        this.setState({ selected: nextProps.forcePage });
      }
    }
  }, {
    key: 'getForwardJump',
    value: function getForwardJump() {
      var selected = this.state.selected;
      var _props2 = this.props,
          pageCount = _props2.pageCount,
          pageRangeDisplayed = _props2.pageRangeDisplayed;


      var forwardJump = selected + pageRangeDisplayed;
      return forwardJump >= pageCount ? pageCount - 1 : forwardJump;
    }
  }, {
    key: 'getBackwardJump',
    value: function getBackwardJump() {
      var selected = this.state.selected;
      var pageRangeDisplayed = this.props.pageRangeDisplayed;


      var backwardJump = selected - pageRangeDisplayed;
      return backwardJump < 0 ? 0 : backwardJump;
    }
  }, {
    key: 'hrefBuilder',
    value: function hrefBuilder(pageIndex) {
      var _props3 = this.props,
          hrefBuilder = _props3.hrefBuilder,
          pageCount = _props3.pageCount;

      if (hrefBuilder && pageIndex !== this.state.selected && pageIndex >= 0 && pageIndex < pageCount) {
        return hrefBuilder(pageIndex + 1);
      }
    }
  }, {
    key: 'ariaLabelBuilder',
    value: function ariaLabelBuilder(pageIndex) {
      var selected = pageIndex === this.state.selected;
      if (this.props.ariaLabelBuilder && pageIndex >= 0 && pageIndex < this.props.pageCount) {
        var label = this.props.ariaLabelBuilder(pageIndex + 1, selected);
        // DEPRECATED: The extraAriaContext prop was used to add additional context
        // to the aria-label. Users should now use the ariaLabelBuilder instead.
        if (this.props.extraAriaContext && !selected) {
          label = label + ' ' + this.props.extraAriaContext;
        }
        return label;
      }
    }
  }, {
    key: 'getPageElement',
    value: function getPageElement(index) {
      var selected = this.state.selected;
      var _props4 = this.props,
          pageClassName = _props4.pageClassName,
          pageLinkClassName = _props4.pageLinkClassName,
          activeClassName = _props4.activeClassName,
          activeLinkClassName = _props4.activeLinkClassName,
          extraAriaContext = _props4.extraAriaContext;


      return _react2.default.createElement(_PageView2.default, {
        key: index,
        onClick: this.handlePageSelected.bind(null, index),
        selected: selected === index,
        pageClassName: pageClassName,
        pageLinkClassName: pageLinkClassName,
        activeClassName: activeClassName,
        activeLinkClassName: activeLinkClassName,
        extraAriaContext: extraAriaContext,
        href: this.hrefBuilder(index),
        ariaLabel: this.ariaLabelBuilder(index),
        page: index + 1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          disabledClassName = _props5.disabledClassName,
          previousClassName = _props5.previousClassName,
          nextClassName = _props5.nextClassName,
          pageCount = _props5.pageCount,
          containerClassName = _props5.containerClassName,
          previousLinkClassName = _props5.previousLinkClassName,
          previousLabel = _props5.previousLabel,
          nextLinkClassName = _props5.nextLinkClassName,
          nextLabel = _props5.nextLabel;
      var selected = this.state.selected;


      var previousClasses = previousClassName + (selected === 0 ? ' ' + disabledClassName : '');
      var nextClasses = nextClassName + (selected === pageCount - 1 ? ' ' + disabledClassName : '');

      var previousAriaDisabled = selected === 0 ? 'true' : 'false';
      var nextAriaDisabled = selected === pageCount - 1 ? 'true' : 'false';

      return _react2.default.createElement(
        'ul',
        { className: containerClassName },
        _react2.default.createElement(
          'li',
          { className: previousClasses },
          _react2.default.createElement(
            'a',
            {
              onClick: this.handlePreviousPage,
              className: previousLinkClassName,
              href: this.hrefBuilder(selected - 1),
              tabIndex: '0',
              role: 'button',
              onKeyPress: this.handlePreviousPage,
              'aria-disabled': previousAriaDisabled
            },
            previousLabel
          )
        ),
        this.pagination(),
        _react2.default.createElement(
          'li',
          { className: nextClasses },
          _react2.default.createElement(
            'a',
            {
              onClick: this.handleNextPage,
              className: nextLinkClassName,
              href: this.hrefBuilder(selected + 1),
              tabIndex: '0',
              role: 'button',
              onKeyPress: this.handleNextPage,
              'aria-disabled': nextAriaDisabled
            },
            nextLabel
          )
        )
      );
    }
  }]);

  return PaginationBoxView;
}(_react.Component);

PaginationBoxView.propTypes = {
  pageCount: _propTypes2.default.number.isRequired,
  pageRangeDisplayed: _propTypes2.default.number.isRequired,
  marginPagesDisplayed: _propTypes2.default.number.isRequired,
  previousLabel: _propTypes2.default.node,
  nextLabel: _propTypes2.default.node,
  breakLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  hrefBuilder: _propTypes2.default.func,
  onPageChange: _propTypes2.default.func,
  initialPage: _propTypes2.default.number,
  forcePage: _propTypes2.default.number,
  disableInitialCallback: _propTypes2.default.bool,
  containerClassName: _propTypes2.default.string,
  pageClassName: _propTypes2.default.string,
  pageLinkClassName: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  activeLinkClassName: _propTypes2.default.string,
  previousClassName: _propTypes2.default.string,
  nextClassName: _propTypes2.default.string,
  previousLinkClassName: _propTypes2.default.string,
  nextLinkClassName: _propTypes2.default.string,
  disabledClassName: _propTypes2.default.string,
  breakClassName: _propTypes2.default.string,
  breakLinkClassName: _propTypes2.default.string,
  extraAriaContext: _propTypes2.default.string,
  ariaLabelBuilder: _propTypes2.default.func
};
PaginationBoxView.defaultProps = {
  pageCount: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: 'selected',
  previousClassName: 'previous',
  nextClassName: 'next',
  previousLabel: 'Previous',
  nextLabel: 'Next',
  breakLabel: '...',
  disabledClassName: 'disabled',
  disableInitialCallback: false
};
exports.default = PaginationBoxView;
//# sourceMappingURL=PaginationBoxView.js.map