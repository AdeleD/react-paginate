'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PaginationListView = require('./PaginationListView');

var _PaginationListView2 = _interopRequireDefault(_PaginationListView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationBoxView = function (_Component) {
  _inherits(PaginationBoxView, _Component);

  function PaginationBoxView(props) {
    _classCallCheck(this, PaginationBoxView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PaginationBoxView).call(this, props));

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
      console.log("Checking");
      if (nextProps.forceSelected !== this.state.selected) {
        console.log("Changing");
        this.setState({ selected: nextProps.forceSelected });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var disabled = this.props.disabledClassName;

      var previousClasses = (0, _classnames2.default)(this.props.previousClassName, { disabled: this.state.selected === 0 });

      var nextClasses = (0, _classnames2.default)(this.props.nextClassName, { disabled: this.state.selected === this.props.pageNum - 1 });

      return _react2.default.createElement(
        'ul',
        { className: this.props.containerClassName },
        _react2.default.createElement(
          'li',
          { onClick: this.handlePreviousPage, className: previousClasses },
          _react2.default.createElement(
            'a',
            { href: '', className: this.props.previousLinkClassName },
            this.props.previousLabel
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(_PaginationListView2.default, {
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
            disabledClassName: this.props.disabledClassName })
        ),
        _react2.default.createElement(
          'li',
          { onClick: this.handleNextPage, className: nextClasses },
          _react2.default.createElement(
            'a',
            { href: '', className: this.props.nextLinkClassName },
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
  subContainerClassName: _react.PropTypes.string,
  pageClassName: _react.PropTypes.string,
  pageLinkClassName: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string,
  previousClassName: _react.PropTypes.string,
  nextClassName: _react.PropTypes.string,
  previousLinkClassName: _react.PropTypes.string,
  nextLinkClassName: _react.PropTypes.string,
  disabledClassName: _react.PropTypes.string
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