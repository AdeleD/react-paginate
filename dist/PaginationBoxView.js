'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _PageView = require('./PageView');

var _PageView2 = _interopRequireDefault(_PageView);

var _BreakView = require('./BreakView');

var _BreakView2 = _interopRequireDefault(_BreakView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationBoxView = function (_Component) {
  _inherits(PaginationBoxView, _Component);

  function PaginationBoxView(props) {
    _classCallCheck(this, PaginationBoxView);

    var _this = _possibleConstructorReturn(this, (PaginationBoxView.__proto__ || Object.getPrototypeOf(PaginationBoxView)).call(this, props));

    _this.handlePreviousPage = function (evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      if (_this.state.selected > 0) {
        _this.handlePageSelected(_this.state.selected - 1, evt);
      }
    };

    _this.handleNextPage = function (evt) {
      evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;
      if (_this.state.selected < _this.props.pageNum - 1) {
        _this.handlePageSelected(_this.state.selected + 1, evt);
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
      if (typeof _this.props.clickCallback !== "undefined" && typeof _this.props.clickCallback === "function") {
        _this.props.clickCallback({ selected: selectedItem });
      }
    };

    _this.pagination = function () {
      var items = {};

      if (_this.props.pageNum <= _this.props.pageRangeDisplayed) {

        for (var index = 0; index < _this.props.pageNum; index++) {
          items['key' + index] = _react2.default.createElement(_PageView2.default, {
            onClick: _this.handlePageSelected.bind(null, index),
            selected: _this.state.selected === index,
            pageClassName: _this.props.pageClassName,
            pageLinkClassName: _this.props.pageLinkClassName,
            activeClassName: _this.props.activeClassName,
            page: index + 1 });
        }
      } else {

        var leftSide = _this.props.pageRangeDisplayed / 2;
        var rightSide = _this.props.pageRangeDisplayed - leftSide;

        if (_this.state.selected > _this.props.pageNum - _this.props.pageRangeDisplayed / 2) {
          rightSide = _this.props.pageNum - _this.state.selected;
          leftSide = _this.props.pageRangeDisplayed - rightSide;
        } else if (_this.state.selected < _this.props.pageRangeDisplayed / 2) {
          leftSide = _this.state.selected;
          rightSide = _this.props.pageRangeDisplayed - leftSide;
        }

        var _index = void 0;
        var page = void 0;
        var breakView = void 0;

        for (_index = 0; _index < _this.props.pageNum; _index++) {

          page = _index + 1;

          var pageView = _react2.default.createElement(_PageView2.default, {
            onClick: _this.handlePageSelected.bind(null, _index),
            selected: _this.state.selected === _index,
            pageClassName: _this.props.pageClassName,
            pageLinkClassName: _this.props.pageLinkClassName,
            activeClassName: _this.props.activeClassName,
            page: _index + 1 });

          if (page <= _this.props.marginPagesDisplayed) {
            items['key' + _index] = pageView;
            continue;
          }

          if (page > _this.props.pageNum - _this.props.marginPagesDisplayed) {
            items['key' + _index] = pageView;
            continue;
          }

          if (_index >= _this.state.selected - leftSide && _index <= _this.state.selected + rightSide) {
            items['key' + _index] = pageView;
            continue;
          }

          var keys = Object.keys(items);
          var breakLabelKey = keys[keys.length - 1];
          var breakLabelValue = items[breakLabelKey];

          if (_this.props.breakLabel && breakLabelValue !== breakView) {
            breakView = _react2.default.createElement(_BreakView2.default, {
              breakLabel: _this.props.breakLabel,
              breakClassName: _this.props.breakClassName
            });

            items['key' + _index] = breakView;
          }
        }
      }

      return items;
    };

    _this.state = {
      selected: props.initialSelected ? props.initialSelected : props.forceSelected ? props.forceSelected : 0
    };
    return _this;
  }

  _createClass(PaginationBoxView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Call the callback with the initialSelected item:
      if (typeof this.props.initialSelected !== 'undefined') {
        this.callCallback(this.props.initialSelected);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.forceSelected !== 'undefined' && this.props.forceSelected !== nextProps.forceSelected) {
        this.setState({ selected: nextProps.forceSelected });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var disabled = this.props.disabledClassName;

      var previousClasses = (0, _classnames2.default)(this.props.previousClassName, _defineProperty({}, disabled, this.state.selected === 0));

      var nextClasses = (0, _classnames2.default)(this.props.nextClassName, _defineProperty({}, disabled, this.state.selected === this.props.pageNum - 1));

      return _react2.default.createElement(
        'ul',
        { className: this.props.containerClassName },
        _react2.default.createElement(
          'li',
          { onClick: this.handlePreviousPage, className: previousClasses },
          _react2.default.createElement(
            'a',
            { className: this.props.previousLinkClassName },
            this.props.previousLabel
          )
        ),
        (0, _reactAddonsCreateFragment2.default)(this.pagination()),
        _react2.default.createElement(
          'li',
          { onClick: this.handleNextPage, className: nextClasses },
          _react2.default.createElement(
            'a',
            { className: this.props.nextLinkClassName },
            this.props.nextLabel
          )
        )
      );
    }
  }]);

  return PaginationBoxView;
}(_react.Component);

PaginationBoxView.propTypes = {
  pageNum: _react.PropTypes.number.isRequired,
  pageRangeDisplayed: _react.PropTypes.number.isRequired,
  marginPagesDisplayed: _react.PropTypes.number.isRequired,
  previousLabel: _react.PropTypes.node,
  nextLabel: _react.PropTypes.node,
  breakLabel: _react.PropTypes.node,
  clickCallback: _react.PropTypes.func,
  initialSelected: _react.PropTypes.number,
  forceSelected: _react.PropTypes.number,
  containerClassName: _react.PropTypes.string,
  pageClassName: _react.PropTypes.string,
  pageLinkClassName: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string,
  previousClassName: _react.PropTypes.string,
  nextClassName: _react.PropTypes.string,
  previousLinkClassName: _react.PropTypes.string,
  nextLinkClassName: _react.PropTypes.string,
  disabledClassName: _react.PropTypes.string,
  breakClassName: _react.PropTypes.string
};
PaginationBoxView.defaultProps = {
  pageNum: 10,
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: "selected",
  previousClassName: "previous",
  nextClassName: "next",
  previousLabel: "Previous",
  nextLabel: "Next",
  breakLabel: "...",
  disabledClassName: "disabled"
};
exports.default = PaginationBoxView;
;
//# sourceMappingURL=PaginationBoxView.js.map