import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Button, List, message } from 'antd';

const InputGroup = Input.Group;

class Setting extends React.Component {
  static propTypes = {
    project: PropTypes.object,
  }

  render() {
    const { project } = this.props;
    if (!project._id) return (<div />);
    return (
      <div>
        功能待完善
      </div>
    );
  }
}

export default Setting;
