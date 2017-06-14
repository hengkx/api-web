import React from 'react';
import Param from '../Param';
// import Tree from '../Tree';

class Test extends React.Component {

  handleParamSave = (params) => {
    console.log(params);
    console.log(JSON.stringify(params));
  }
  render() {
    return (
      <div>
        <Param save={this.handleParamSave} />
      </div>
    );
  }
}

export default Test;
