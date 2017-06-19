/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Checkbox, Button } from 'antd';
import { Map, fromJS, is } from 'immutable';
import withBase from '../Base';
import './less/value.less';
import './less/form-item.less';

class Value extends React.Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    // value: PropTypes.shape({ uuid: PropTypes.string.isRequired }).isRequired,
    value: PropTypes.instanceOf(Map).isRequired,
    del: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    default: false
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ value });
    }
  }

  handleDelClick = () => {
    // const { value } = this.state;
    this.props.del(this.props.index);
  }


  handleChange = (e) => {
    let val = e.target.value;
    if (e.target.type === 'checkbox') {
      val = e.target.checked;
    }
    const value = this.state.value.set(e.target.name, val);
    this.setState({ value });
    this.props.onChange(value, this.props.index);
  }

  render() {
    console.count('value render');
    const { value } = this.state;
    return (
      <div className="value">
        <div className="form-item">
          <label className="required">参数值</label>
          <Input name="value" value={value.get('value')} onChange={this.handleChange} />
        </div>
        <div className="form-item">
          <label>值说明</label>
          <Input name="remark" value={value.get('remark')} onChange={this.handleChange} />
        </div>
        <div className="form-item" style={{ width: '.8rem' }}>
          <label>默认</label>
          <Checkbox name="default" checked={value.get('default')} onChange={this.handleChange} />
        </div>
        <div className="oper">
          <Button type="danger" onClick={this.handleDelClick}>删除</Button>
        </div>
      </div>
    );
  }
}

export default withBase(Value);
