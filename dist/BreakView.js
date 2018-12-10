'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreakView = function BreakView(props) {
  var label = props.breakLabel;
  var className = props.breakClassName || 'break';
  var linkClassName = props.breakLinkClassName || '';
  var onClick = props.onClick;

  return _react2.default.createElement(
    'li',
    { className: className },
    _react2.default.createElement(
      'a',
      { onClick: onClick,
        role: 'button',
        tabIndex: '0',
        onKeyPress: onClick,
        className: linkClassName },
      label
    )
  );
};

exports.default = BreakView;
//# sourceMappingURL=BreakView.js.map