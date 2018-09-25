'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreakView = function BreakView(props) {
  var cssClassName = props.breakClassName || 'break';
  var linkClassName = props.breakLinkClassName;
  var onClick = props.onClick;
  var href = props.href;
  var ariaLabel = 'Page ' + props.page + (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  var label = props.breakLabel;

  return _react2.default.createElement(
    'li',
    { className: cssClassName },
    _react2.default.createElement(
      'a',
      { onClick: onClick,
        role: 'button',
        className: linkClassName,
        href: href,
        tabIndex: '0',
        'aria-label': ariaLabel,
        onKeyPress: onClick },
      label
    )
  );
};

exports.default = BreakView;
//# sourceMappingURL=BreakView.js.map