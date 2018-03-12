'use strict';

import React from 'react';

const PageView = (props) => {
  let cssClassName = props.pageClassName;
  let linkClassName = props.pageLinkClassName;
  const onClick = props.onClick;
  const href = props.href;
  let ariaLabel = 'Page ' + props.page +
    (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  let ariaCurrent = null;

  if (props.selected) {
    ariaCurrent = 'page';
    ariaLabel = 'Page ' + props.page + ' is your current page';
    if (typeof(cssClassName) !== 'undefined') {
      cssClassName = cssClassName + ' ' + props.activeClassName;
    } else {
      cssClassName = props.activeClassName;
    }
    if (typeof(linkClassName) !== 'undefined') {
      linkClassName = linkClassName + ' ' + props.activeLinkClassName;
    } else {
      linkClassName = props.activeLinkClassName;
    }
  }

  return (
      <li className={cssClassName}>
          <a onClick={onClick}
             className={linkClassName}
             href={href}
             tabIndex="0"
             aria-label={ariaLabel}
             aria-current={ariaCurrent}
             onKeyPress={onClick}>
            {props.page}
          </a>
      </li>
  )
}

export default PageView;
