'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BreakView = function BreakView(props) {
  var breakLabel = props.breakLabel,
      breakClassName = props.breakClassName,
      breakLinkClassName = props.breakLinkClassName,
      onClick = props.onClick;
  var className = breakClassName || 'break';
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: className
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: breakLinkClassName,
    onClick: onClick,
    role: "button",
    tabIndex: "0",
    onKeyPress: onClick
  }, breakLabel));
};

BreakView.propTypes = {
  breakLabel: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  breakClassName: _propTypes["default"].string,
  breakLinkClassName: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired
};
var _default = BreakView;
exports["default"] = _default;
//# sourceMappingURL=BreakView.js.map