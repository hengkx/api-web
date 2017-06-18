/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Checkbox, Button, Form, Icon, Radio } from 'antd';
import './less/value.less';
import './less/form-item.less';

const FormItem = Form.Item;


class Value extends React.Component {

  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    default: PropTypes.bool,
    value: PropTypes.shape({ uuid: PropTypes.string.isRequired }).isRequired,
    del: PropTypes.func.isRequired
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

  componentDidMount() {
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.default !== this.props.default) {
      this.props.form.setFieldsValue({ default: nextProps.default });
    }
  }

  handleDelClick = () => {
    const { value } = this.state;
    this.props.del(value);
  }

  render() {
    return (
      <div className="value">
        <div className="form-item">
          <label className="required">参数值</label>
          <Input />
        </div>
        <div className="form-item">
          <label>值说明</label>
          <Input />
        </div>
        <div className="form-item" style={{ width: '.8rem' }}>
          <label>默认</label>
          <Checkbox />
        </div>
        <div className="oper">
          <Button type="danger" onClick={this.handleDelClick}>删除</Button>
        </div>
      </div>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields, props.value.uuid);
  }
})(Value);
