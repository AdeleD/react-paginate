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

  return _react2.default.createElement(
    'li',
    { className: className },
    label
  );
};

exports.default = BreakView;
//# sourceMappingURL=BreakView.js.map