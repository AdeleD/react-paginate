'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageView = function PageView(props) {
  var cssClassName = props.pageClassName;
  var linkClassName = props.pageLinkClassName;
  var onClick = props.onClick;
  var href = props.href;
  var ariaLabel = 'Page ' + props.page + (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  var ariaCurrent = null;

  if (props.selected) {
    ariaCurrent = 'page';
    ariaLabel = 'Page ' + props.page + ' is your current page';
    if (typeof cssClassName !== 'undefined') {
      cssClassName = cssClassName + ' ' + props.activeClassName;
    } else {
      cssClassName = props.activeClassName;
    }
    if (typeof linkClassName !== 'undefined') {
      linkClassName = linkClassName + ' ' + props.activeLinkClassName;
    } else {
      linkClassName = props.activeLinkClassName;
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
        'aria-label': ariaLabel,
        'aria-current': ariaCurrent,
        onKeyPress: onClick },
      props.page
    )
  );
};

exports.default = PageView;
//# sourceMappingURL=PageView.js.map