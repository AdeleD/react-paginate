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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    _this.callCallback = function (selectedItem) {
      if (typeof _this.props.onPageChange !== "undefined" && typeof _this.props.onPageChange === "function") {
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
          breakClassName = _this$props.breakClassName;
      var selected = _this.state.selected;


      if (pageCount <= pageRangeDisplayed) {

        for (var index = 0; index < pageCount; index++) {
          items.push(_this.getPageElement(index));
        }
      } else {
        // 1,2,3...5,6,7,8,9...11,12,13
        //         ^
        var leftSideIndex = selected - Math.floor(pageRangeDisplayed / 2);
        leftSideIndex = Math.max(0, leftSideIndex);

        // 1,2,3...5,6,7,8,9...11,12,13
        // ^^^^^
        var leftMarginIndexes = Array.from({ length: marginPagesDisplayed }, function (_, k) {
          return k;
        });

        // 1,2,3...5,6,7,8,9...11,12,13
        //                     ^^^^^^^^
        var rightMarginIndexes = Array.from({ length: marginPagesDisplayed }, function (_, k) {
          return k + pageCount - marginPagesDisplayed;
        });

        // 1,2,3...5,6,7,8,9...11,12,13
        //         ^^^^^^^^^
        var rangeIndexes = Array.from(
        // pageRangeDisplayed can be 0
        // but at least one item must be in this array (selected item)
        { length: Math.max(pageRangeDisplayed, 1) }, function (_, k) {
          return k + leftSideIndex;
        });

        // 1,2,3...5,6,7,8,9...11,12,13
        // ^^^^^ + ^^^^^^^^^ + ^^^^^^^^
        var lastIndex = -1;
        var indexes = [].concat(_toConsumableArray(leftMarginIndexes), _toConsumableArray(rangeIndexes), _toConsumableArray(rightMarginIndexes)).filter(function (i) {
          var outOfRange = i < 0 || i >= pageCount;
          var duplicated = i <= lastIndex;
          lastIndex = Math.max(i, lastIndex);
          return !outOfRange && !duplicated;
        });

        var createPageView = function createPageView(index) {
          return _this.getPageElement(index);
        };

        for (var i = 0; i < indexes.length; i++) {
          var _index = indexes[i];
          var prevIndex = i > 0 ? indexes[i - 1] : indexes[i];

          // if distance between current and previous page more than 1, then render BreakView
          if (_index - prevIndex > 1) {
            items.push(_react2.default.createElement(_BreakView2.default, {
              key: 'breakview-' + _index,
              breakLabel: breakLabel,
              breakClassName: breakClassName
            }));
          }

          items.push(createPageView(_index));
        }
      }

      return items;
    };

    _this.state = {
      selected: props.initialPage ? props.initialPage : props.forcePage ? props.forcePage : 0
    };
    return _this;
  }

  _createClass(PaginationBoxView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialPage = _props.initialPage,
          disableInitialCallback = _props.disableInitialCallback;
      // Call the callback with the initialPage item:

      if (typeof initialPage !== 'undefined' && !disableInitialCallback) {
        this.callCallback(initialPage);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.forcePage !== 'undefined' && this.props.forcePage !== nextProps.forcePage) {
        this.setState({ selected: nextProps.forcePage });
      }
    }
  }, {
    key: 'hrefBuilder',
    value: function hrefBuilder(pageIndex) {
      var _props2 = this.props,
          hrefBuilder = _props2.hrefBuilder,
          pageCount = _props2.pageCount;

      if (hrefBuilder && pageIndex !== this.state.selected && pageIndex >= 0 && pageIndex < pageCount) {
        return hrefBuilder(pageIndex + 1);
      }
    }
  }, {
    key: 'getPageElement',
    value: function getPageElement(index) {
      var selected = this.state.selected;
      var _props3 = this.props,
          pageClassName = _props3.pageClassName,
          pageLinkClassName = _props3.pageLinkClassName,
          activeClassName = _props3.activeClassName,
          extraAriaContext = _props3.extraAriaContext;


      return _react2.default.createElement(_PageView2.default, {
        key: index,
        onClick: this.handlePageSelected.bind(null, index),
        selected: selected === index,
        pageClassName: pageClassName,
        pageLinkClassName: pageLinkClassName,
        activeClassName: activeClassName,
        extraAriaContext: extraAriaContext,
        href: this.hrefBuilder(index),
        page: index + 1 });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          disabledClassName = _props4.disabledClassName,
          previousClassName = _props4.previousClassName,
          nextClassName = _props4.nextClassName,
          pageCount = _props4.pageCount,
          containerClassName = _props4.containerClassName,
          previousLinkClassName = _props4.previousLinkClassName,
          previousLabel = _props4.previousLabel,
          nextLinkClassName = _props4.nextLinkClassName,
          nextLabel = _props4.nextLabel;
      var selected = this.state.selected;


      var previousClasses = previousClassName + (selected === 0 ? ' ' + disabledClassName : '');
      var nextClasses = nextClassName + (selected === pageCount - 1 ? ' ' + disabledClassName : '');

      return _react2.default.createElement(
        'ul',
        { className: containerClassName },
        _react2.default.createElement(
          'li',
          { className: previousClasses },
          _react2.default.createElement(
            'a',
            { onClick: this.handlePreviousPage,
              className: previousLinkClassName,
              href: this.hrefBuilder(selected - 1),
              tabIndex: '0',
              role: 'button',
              onKeyPress: this.handlePreviousPage },
            previousLabel
          )
        ),
        this.pagination(),
        _react2.default.createElement(
          'li',
          { className: nextClasses },
          _react2.default.createElement(
            'a',
            { onClick: this.handleNextPage,
              className: nextLinkClassName,
              href: this.hrefBuilder(selected + 1),
              tabIndex: '0',
              role: 'button',
              onKeyPress: this.handleNextPage },
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
  breakLabel: _propTypes2.default.node,
  hrefBuilder: _propTypes2.default.func,
  onPageChange: _propTypes2.default.func,
  initialPage: _propTypes2.default.number,
  forcePage: _propTypes2.default.number,
  disableInitialCallback: _propTypes2.default.bool,
  containerClassName: _propTypes2.default.string,
  pageClassName: _propTypes2.default.string,
  pageLinkClassName: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  previousClassName: _propTypes2.default.string,
  nextClassName: _propTypes2.default.string,
  previousLinkClassName: _propTypes2.default.string,
  nextLinkClassName: _propTypes2.default.string,
  disabledClassName: _propTypes2.default.string,
  breakClassName: _propTypes2.default.string
};
PaginationBoxView.defaultProps = {
  pageCount: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: "selected",
  previousClassName: "previous",
  nextClassName: "next",
  previousLabel: "Previous",
  nextLabel: "Next",
  breakLabel: "...",
  disabledClassName: "disabled",
  disableInitialCallback: false
};
exports.default = PaginationBoxView;
;
//# sourceMappingURL=PaginationBoxView.js.map