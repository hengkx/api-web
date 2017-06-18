import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Modal, message, Table, Popconfirm } from 'antd';
import Param from '../Param';

const FormItem = Form.Item;

class Add extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <FormItem
            label="接口名称"
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入接口名称!' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="接口地址"
            {...formItemLayout}
          >
            {getFieldDecorator('version', {
              rules: [{ required: true, message: '请输入项接口地址!' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="请求参数"
            {...formItemLayout}
          >
            <Param />
            {/* {getFieldDecorator('requestParams')(<Param />)}*/}
          </FormItem>
          <FormItem
            label="响应参数"
            {...formItemLayout}
          >
            <Param />
            {/* {getFieldDecorator('responseParams')(<Param />)}*/}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Add);
