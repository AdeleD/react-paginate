'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreakView = function BreakView(props) {
  var breakLabel = props.breakLabel,
      breakClassName = props.breakClassName,
      breakLinkClassName = props.breakLinkClassName,
      onClick = props.onClick;

  var className = breakClassName || 'break';

  return _react2.default.createElement(
    'li',
    { className: className },
    _react2.default.createElement(
      'a',
      {
        className: breakLinkClassName,
        onClick: onClick,
        role: 'button',
        tabIndex: '0',
        onKeyPress: onClick
      },
      breakLabel
    )
  );
};

BreakView.propTypes = {
  breakLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  breakClassName: _propTypes2.default.string,
  breakLinkClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = BreakView;
//# sourceMappingURL=BreakView.js.map