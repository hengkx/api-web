import React from 'react';
import { is } from 'immutable';


function withBase(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {

    shouldComponentUpdate(nextProps = {}, nextState = {}) {
      const thisProps = this.props || {};
      const thisState = this.state || {};
      if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
        Object.keys(thisState).length !== Object.keys(nextState || {}).length) {
        // console.log('keys');
        return true;
      }

      //  Object.keys(nextProps).forEach((key)=>);
      for (const key in nextProps) {
        if (!is(thisProps[key], nextProps[key])) {
          // console.log('nextProps', key, thisProps);
          // console.log('nextProps', nextProps);
          return true;
        }
      }

      for (const key in nextState) {
        if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
          // console.log('nextState');
          return true;
        }
      }
      return false;
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.props} />;
    }
  };
}


export default withBase;
