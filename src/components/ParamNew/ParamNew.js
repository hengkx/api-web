import React from 'react';
import { Icon } from 'react-fa';
import './less/paramNew.less';

class ParamNew extends React.Component {
  render() {
    return (
      <div className="paramNew">
        <div className="row">
          <div className="type t--object">Object</div>
          <Icon name="pencil" />
          <Icon name="plus" />
          <Icon name="close" />
        </div>
      </div>
    );
  }
}

export default ParamNew;
