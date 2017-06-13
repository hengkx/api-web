/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Checkbox, Form, Icon } from 'antd';
import './less/value.less';

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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="value">
        <Form layout="inline">
          <FormItem>
            <Icon onClick={this.handleDelClick} type="minus-circle-o" />
          </FormItem>
          <FormItem>
            {getFieldDecorator('value', {
              rules: [{ required: true, message: '请输入值!' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="字段说明"
          >
            {getFieldDecorator('type')(<Input />)}
          </FormItem>
          <FormItem
            label="默认"
          >
            {getFieldDecorator('default', {
              valuePropName: 'checked'
            })(<Checkbox />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields, props.value.uuid);
  }
})(Value);
