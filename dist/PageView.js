'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageView = function (_React$Component) {
  _inherits(PageView, _React$Component);

  function PageView() {
    _classCallCheck(this, PageView);

    return _possibleConstructorReturn(this, (PageView.__proto__ || Object.getPrototypeOf(PageView)).apply(this, arguments));
  }

  _createClass(PageView, [{
    key: 'render',
    value: function render() {
      var cssClassName = this.props.pageClassName;
      var linkClassName = this.props.pageLinkClassName;
      var onClick = this.props.onClick;
      var href = this.props.href;

      if (this.props.selected) {
        if (typeof cssClassName !== 'undefined') {
          cssClassName = cssClassName + ' ' + this.props.activeClassName;
        } else {
          cssClassName = this.props.activeClassName;
        }
      }

      return _react2.default.createElement(
        'li',
        { className: cssClassName },
        _react2.default.createElement(
          'a',
          { onClick: onClick,
            className: linkClassName,
            href: href,
            tabIndex: '0',
            onKeyPress: onClick },
          this.props.page
        )
      );
    }
  }]);

  return PageView;
}(_react2.default.Component);

exports.default = PageView;
;
//# sourceMappingURL=PageView.js.map