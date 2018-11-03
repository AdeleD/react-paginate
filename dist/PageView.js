'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageView = function PageView(props) {
  var pageClassName = props.pageClassName;
  var pageLinkClassName = props.pageLinkClassName;

  var onClick = props.onClick;
  var href = props.href;

  var ariaLabel = 'Page ' + props.page + (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  var ariaCurrent = null;

  if (props.selected) {
    ariaCurrent = 'page';
    ariaLabel = 'Page ' + props.page + ' is your current page';

    if (typeof pageClassName !== 'undefined') {
      pageClassName = pageClassName + ' ' + props.activeClassName;
    } else {
      pageClassName = props.activeClassName;
    }

    if (typeof pageLinkClassName !== 'undefined') {
      pageLinkClassName = pageLinkClassName;

      if (typeof props.activeLinkClassName !== 'undefined') {
        pageLinkClassName = pageLinkClassName + ' ' + props.activeLinkClassName;
      }
    } else {
      pageLinkClassName = props.activeLinkClassName;
    }
  }

  return _react2.default.createElement(
    'li',
    { className: pageClassName },
    _react2.default.createElement(
      'a',
      { onClick: onClick,
        role: 'button',
        className: pageLinkClassName,
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