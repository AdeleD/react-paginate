'use strict';

import React from 'react';

const BreakView = (props) => {
  let cssClassName = props.breakClassName || 'break';
  const linkClassName = props.breakLinkClassName;
  const onClick = props.onClick;
  const href = props.href;
  let ariaLabel = 'Page ' + props.page +
    (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
  const label = props.breakLabel;

  return (
    <li className={cssClassName}>
      <a onClick={onClick}
          role="button"
          className={linkClassName}
          href={href}
          tabIndex="0"
          aria-label={ariaLabel}
          onKeyPress={onClick}>
        {label}
      </a>
    </li>
  );
}

export default BreakView;
