'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PageView = function PageView(props) {
  var pageClassName = props.pageClassName;
  var pageLinkClassName = props.pageLinkClassName;
  var onClick = props.onClick;
  var href = props.href;
  var ariaLabel = props.ariaLabel || 'Page ' + props.page + (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  var ariaCurrent = null;

  if (props.selected) {
    ariaCurrent = 'page';
    ariaLabel = props.ariaLabel || 'Page ' + props.page + ' is your current page';

    if (typeof pageClassName !== 'undefined') {
      pageClassName = pageClassName + ' ' + props.activeClassName;
    } else {
      pageClassName = props.activeClassName;
    }

    if (typeof pageLinkClassName !== 'undefined') {
      if (typeof props.activeLinkClassName !== 'undefined') {
        pageLinkClassName = pageLinkClassName + ' ' + props.activeLinkClassName;
      }
    } else {
      pageLinkClassName = props.activeLinkClassName;
    }
  }

  return /*#__PURE__*/_react["default"].createElement("li", {
    className: pageClassName
  }, /*#__PURE__*/_react["default"].createElement("a", {
    onClick: onClick,
    role: "button",
    className: pageLinkClassName,
    href: href,
    tabIndex: "0",
    "aria-label": ariaLabel,
    "aria-current": ariaCurrent,
    onKeyPress: onClick
  }, props.page));
};

PageView.propTypes = {
  onClick: _propTypes["default"].func.isRequired,
  selected: _propTypes["default"].bool.isRequired,
  pageClassName: _propTypes["default"].string,
  pageLinkClassName: _propTypes["default"].string,
  activeClassName: _propTypes["default"].string,
  activeLinkClassName: _propTypes["default"].string,
  extraAriaContext: _propTypes["default"].string,
  href: _propTypes["default"].string,
  ariaLabel: _propTypes["default"].string,
  page: _propTypes["default"].number.isRequired
};
var _default = PageView;
exports["default"] = _default;
//# sourceMappingURL=PageView.js.map