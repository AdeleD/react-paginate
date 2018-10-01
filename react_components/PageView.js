'use strict';

import React from 'react';

const PageView = (props) => {
  let cssClassName = props.pageClassName;
  let cssLinkClassName = props.pageLinkClassName;
  
  //let linkClassName = 
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

    if(typeof(cssLinkClassName) !== 'undefined'){
      cssLinkClassName = cssLinkClassName + ' ' + props.activeLinkClassName;
    }else{
      cssLinkClassName = props.activeLinkClassName;
    }
  }

  return (
      <li className={cssClassName}>
          <a onClick={onClick}
             role="button"
             className={cssLinkClassName}
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
