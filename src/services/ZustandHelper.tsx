import produce from 'immer';
import React from 'react';

export function connect(selectors: (props: any) => {}) {
  return (Component: any) =>
    React.forwardRef((props, ref) => {
      const selectorValues = selectors(props);
      const keySelectors = Object.keys(selectorValues);

      const combinedProps = produce(props, draftProps => {
        keySelectors.forEach(key => {
          draftProps[key] = selectorValues[key];
        });
      });

      return <Component ref={ref} {...combinedProps} />;
    });
}
