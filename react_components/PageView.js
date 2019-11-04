'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const PageView = props => {
  let pageClassName = props.pageClassName;
  let pageLinkClassName = props.pageLinkClassName;
  let pageLinkStyle = props.pageLinkStyle;

  const onClick = props.onClick;
  const href = props.href;
  let ariaLabel =
    props.ariaLabel ||
    'Page ' +
      props.page +
      (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  let ariaCurrent = null;

  if (props.selected) {
    ariaCurrent = 'page';

    ariaLabel =
      props.ariaLabel || 'Page ' + props.page + ' is your current page';

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

    pageLinkStyle = props.activeStyle;
  }

  return (
    <li className={pageClassName}>
      <a
        onClick={onClick}
        role="button"
        className={pageLinkClassName}
        style={pageLinkStyle}
        href={href}
        tabIndex="0"
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onKeyPress={onClick}
      >
        {props.page}
      </a>
    </li>
  );
};

PageView.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  pageClassName: PropTypes.string,
  pageLinkClassName: PropTypes.string,
  activeStyle: PropTypes.object,
  activeClassName: PropTypes.string,
  activeLinkClassName: PropTypes.string,
  extraAriaContext: PropTypes.string,
  href: PropTypes.string,
  ariaLabel: PropTypes.string,
  page: PropTypes.number.isRequired,
};

export default PageView;
