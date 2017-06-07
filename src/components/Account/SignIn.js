import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, message, Button } from 'antd';
import { Link } from 'react-router';
import { rsa } from '../../utils';

const FormItem = Form.Item;

class SignIn extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
      setFields: PropTypes.func.isRequired,
    }).isRequired,
    signIn: PropTypes.func.isRequired,
    signInResult: PropTypes.shape({ code: PropTypes.number.isRequired })
  }

  static defaultProps = {
    signInResult: undefined
  }

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { signInResult } = nextProps;
    if (signInResult !== this.props.signInResult) {
      console.log(signInResult);
      if (signInResult.code !== 0) {
        message.error(signInResult.message);
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const password = rsa.encrypt(values.password);
        this.props.signIn({
          username: values.username,
          password,
          email: values.email
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [
              { min: 6, message: '用户名不能小于6位!' },
              { required: true, message: '请输入用户名!' }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              { min: 6, message: '密码不能小于6位!' },
              { required: true, message: '请输入密码!' }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">登录</Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          没有帐号，<Link to="/signin">免费注册</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SignIn);
