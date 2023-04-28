import React from 'react';

export function connect(stores: any) {
  return (Component: any) =>
    React.forwardRef((props, ref) => {
      let storeWrapper = {};
      if (Array.isArray(stores)) {
        stores.map(({store, selector}) => {
          storeWrapper = {
            ...storeWrapper,
            ...store(selector),
          };
        });
      } else {
        if (typeof stores === 'object') {
          const {store, selector} = stores;
          storeWrapper = {
            ...store(selector),
          };
        }
      }

      if (Component !== null && typeof Component !== 'undefined') {
        return <Component ref={ref} {...props} {...storeWrapper} />;
      } else {
        return null;
      }
    });
}
