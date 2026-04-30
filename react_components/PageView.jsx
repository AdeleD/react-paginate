'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const PageView = (props) => {
  let { pageClassName, pageLinkClassName } = props;
  const {
    page,
    selected,
    activeClassName,
    activeLinkClassName,
    getEventListener,
    pageSelectedHandler,
    href,
    extraAriaContext,
    pageLabelBuilder,
    rel,
  } = props;

  let ariaLabel =
    props.ariaLabel ||
    'Page ' + page + (extraAriaContext ? ' ' + extraAriaContext : '');
  let ariaCurrent = null;

  if (selected) {
    ariaCurrent = 'page';

    ariaLabel = props.ariaLabel || 'Page ' + page + ' is your current page';

    if (typeof pageClassName !== 'undefined') {
      pageClassName = pageClassName + ' ' + activeClassName;
    } else {
      pageClassName = activeClassName;
    }

    if (typeof pageLinkClassName !== 'undefined') {
      if (typeof activeLinkClassName !== 'undefined') {
        pageLinkClassName = pageLinkClassName + ' ' + activeLinkClassName;
      }
    } else {
      pageLinkClassName = activeLinkClassName;
    }
  }

  return (
    <li className={pageClassName}>
      <a
        rel={rel}
        role={!href ? 'button' : undefined}
        className={pageLinkClassName}
        href={href}
        tabIndex={selected ? '-1' : '0'}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onKeyPress={pageSelectedHandler}
        {...getEventListener(pageSelectedHandler)}
      >
        {pageLabelBuilder(page)}
      </a>
    </li>
  );
};

PageView.propTypes = {
  pageSelectedHandler: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  pageClassName: PropTypes.string,
  pageLinkClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  activeLinkClassName: PropTypes.string,
  extraAriaContext: PropTypes.string,
  href: PropTypes.string,
  ariaLabel: PropTypes.string,
  page: PropTypes.number.isRequired,
  getEventListener: PropTypes.func.isRequired,
  pageLabelBuilder: PropTypes.func.isRequired,
  rel: PropTypes.string,
};

export default PageView;
