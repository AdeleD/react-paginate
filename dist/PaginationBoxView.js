'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PaginationListView = require('./PaginationListView');

var _PaginationListView2 = _interopRequireDefault(_PaginationListView);

var PaginationBoxView = (function (_React$Component) {
  _inherits(PaginationBoxView, _React$Component);

  _createClass(PaginationBoxView, null, [{
    key: 'propTypes',
    value: {
      pageNum: _react2['default'].PropTypes.number.isRequired,
      pageRangeDisplayed: _react2['default'].PropTypes.number.isRequired,
      marginPagesDisplayed: _react2['default'].PropTypes.number.isRequired,
      previousLabel: _react2['default'].PropTypes.node,
      nextLabel: _react2['default'].PropTypes.node,
      breakLabel: _react2['default'].PropTypes.node,
      clickCallback: _react2['default'].PropTypes.func,
      initialSelected: _react2['default'].PropTypes.number,
      forceSelected: _react2['default'].PropTypes.number,
      containerClassName: _react2['default'].PropTypes.string,
      subContainerClassName: _react2['default'].PropTypes.string,
      pageClassName: _react2['default'].PropTypes.string,
      pageLinkClassName: _react2['default'].PropTypes.string,
      activeClassName: _react2['default'].PropTypes.string,
      previousClassName: _react2['default'].PropTypes.string,
      nextClassName: _react2['default'].PropTypes.string,
      previousLinkClassName: _react2['default'].PropTypes.string,
      nextLinkClassName: _react2['default'].PropTypes.string,
      disabledClassName: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
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
    },
    enumerable: true
  }]);

  function PaginationBoxView(props) {
    _classCallCheck(this, PaginationBoxView);

    _get(Object.getPrototypeOf(PaginationBoxView.prototype), 'constructor', this).call(this, props);

    this.state = {
      selected: props.initialSelected ? props.initialSelected : 0
    };
  }

  _createClass(PaginationBoxView, [{
    key: 'handlePageSelected',
    value: function handlePageSelected(selected, event) {
      event.preventDefault();

      if (this.state.selected === selected) return;

      this.setState({ selected: selected });

      if (typeof this.props.clickCallback !== "undefined" && typeof this.props.clickCallback === "function") {
        this.props.clickCallback({ selected: selected });
      }
    }
  }, {
    key: 'handlePreviousPage',
    value: function handlePreviousPage(event) {
      event.preventDefault();
      if (this.state.selected > 0) {
        this.handlePageSelected(this.state.selected - 1, event);
      }
    }
  }, {
    key: 'handleNextPage',
    value: function handleNextPage(event) {
      event.preventDefault();
      if (this.state.selected < this.props.pageNum - 1) {
        this.handlePageSelected(this.state.selected + 1, event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var disabled = this.props.disabledClassName;

      var previousClasses = (0, _classnames2['default'])(this.props.previousClassName, { disabled: this.state.selected === 0 });

      var nextClasses = (0, _classnames2['default'])(this.props.nextClassName, { disabled: this.state.selected === this.props.pageNum - 1 });

      return _react2['default'].createElement(
        'ul',
        { className: this.props.containerClassName },
        _react2['default'].createElement(
          'li',
          { onClick: this.handlePreviousPage, className: previousClasses },
          _react2['default'].createElement(
            'a',
            { href: '', className: this.props.previousLinkClassName },
            this.props.previousLabel
          )
        ),
        _react2['default'].createElement(_PaginationListView2['default'], {
          onPageSelected: this.handlePageSelected,
          selected: this.state.selected,
          pageNum: this.props.pageNum,
          pageRangeDisplayed: this.props.pageRangeDisplayed,
          marginPagesDisplayed: this.props.marginPagesDisplayed,
          breakLabel: this.props.breakLabel,
          subContainerClassName: this.props.subContainerClassName,
          pageClassName: this.props.pageClassName,
          pageLinkClassName: this.props.pageLinkClassName,
          activeClassName: this.props.activeClassName,
          disabledClassName: this.props.disabledClassName }),
        _react2['default'].createElement(
          'li',
          { onClick: this.handleNextPage, className: nextClasses },
          _react2['default'].createElement(
            'a',
            { href: '', className: this.props.nextLinkClassName },
            this.props.nextLabel
          )
        )
      );
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.forceSelected !== 'undefined' && nextProps.forceSelected !== this.state.selected) {
        this.setState({ selected: nextProps.forceSelected });
      }
    }
  }]);

  return PaginationBoxView;
})(_react2['default'].Component);

exports['default'] = PaginationBoxView;
;
module.exports = exports['default'];