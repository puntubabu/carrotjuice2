/**
 * Combinators/modifiers for views/JSX elements.
 */

import React from 'react'

const flexbox_stack = (elements) => {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  }}>
    {elements}
  </div>;
};

export {
  flexbox_stack as flexbox_stack
};
