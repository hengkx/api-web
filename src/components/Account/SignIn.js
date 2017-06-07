import React from 'react';
import PropTypes from 'prop-types';
import JSEncrypt from 'jsencrypt';
import { Form, Input, message, Button } from 'antd';
import { Link } from 'react-router';

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
    checkUsernameExist: PropTypes.func.isRequired,
    signInResult: PropTypes.shape({ code: PropTypes.number.isRequired }),
    checkUsernameExistResult: PropTypes.shape({ code: PropTypes.number.isRequired }),
  }

  static defaultProps = {
    signInResult: undefined,
    checkUsernameExistResult: undefined
  }

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { signInResult, checkUsernameExistResult } = nextProps;
    if (signInResult !== this.props.signInResult) {
      console.log(signInResult);
      if (signInResult.code !== 0) {
        message.error(signInResult.message);
      }
    }
    if (checkUsernameExistResult !== this.props.checkUsernameExistResult) {
      if (checkUsernameExistResult.code !== 0) {
        this.props.form.setFields({
          username: {
            value: this.props.form.getFieldValue('username'),
            errors: [new Error(checkUsernameExistResult.message)],
          },
        });
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const encrypt = new JSEncrypt.JSEncrypt();

        encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDwM2xWXTxblmLsUtr8Hg+pPsad
bEDH2XPbXaMCGzSGtZNwg2wOMqC0c7hvFs71CEpiKp8rwX3+c/UbdX0q8bXmoaPI
vOb2FZCuD9iLGjieXW/9MdKBtAIclwqIeedSgCN18e7J204asNBVc5vsuv5C/ckf
6cQJv7apMIjggdXMCwIDAQAB
-----END PUBLIC KEY-----`);
        const password = encrypt.encrypt(values.password);
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
