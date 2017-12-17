'use strict';

import React from 'react';

const PageView = (props) => {
  let cssClassName = props.pageClassName;
  const linkClassName = props.pageLinkClassName;
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
  }

  let rel = null;
  if (props.selectedPage === props.page) {
    rel = 'prev';
  }
  if (props.selectedPage === props.page - 2) {
    rel = 'next';
  }

  return (
      <li className={cssClassName}>
          <a onClick={onClick}
             className={linkClassName}
             href={href}
             rel={rel}
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
