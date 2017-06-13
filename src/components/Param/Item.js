/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button } from 'antd';
import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';
import uuidV1 from 'uuid/v1';
import Value from './Value';
import './less/item.less';

const FormItem = Form.Item;
const Option = Select.Option;
const paramTypes = ['number', 'string', 'boolean', 'datetime'];

class Item extends React.Component {

  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }


  handleAddValueClick = () => {
    const values = [...this.state.values];
    values.push({ uuid: uuidV1() });
    this.setState({ values });
  }

  delValue = (value) => {
    const values = [...this.state.values];
    remove(values, { uuid: value.uuid });
    this.setState({ values });
  }
  handleFieldChange = (changedFields, uuid) => {
    const values = this.state.values.slice();
    let index = findIndex(values, { uuid });
    const value = values[index];
    if (changedFields.default && changedFields.default.value) {
      index = findIndex(values, { default: true });
      if (index !== -1) {
        values[index].default = false;
      }
    }
    Object.keys(changedFields).forEach(key => {
      value[key] = changedFields[key].value;
    });
    this.setState({ values });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { values } = this.state;
    return (
      <div className="item">
        <div className="left">
          <Form layout="inline">
            <FormItem
              label="参数名称"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入参数名称!' }],
              })(<Input />)}
            </FormItem>
            <FormItem
              label="参数类型"
            >
              {getFieldDecorator('type', {
                initialValue: 'string',
                rules: [{ required: true, message: '请选择参数类型!' }],
              })(<Select>
                {paramTypes.map(paramType => <Option key={paramType}>{paramType}</Option>)}
              </Select>)}
            </FormItem>
            <FormItem
              label="参数说明"
            >
              {getFieldDecorator('remark')(<Input />)}
            </FormItem>
          </Form>
          <div>
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-label" style={{ verticalAlign: 'top', display: 'inline-block' }}>
                <label>值可能性</label>
              </div>
              <div className="ant-form-item-control-wrapper" style={{ display: 'inline-block' }}>
                <div className="ant-form-item-control">
                  {values.map(value => (<Value
                    del={this.delValue}
                    key={value.uuid}
                    value={value}
                    default={value.default}
                    onChange={this.handleFieldChange}
                  />))}
                  <Button type="primary" onClick={this.handleAddValueClick}>添加值</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Button type="primary">添加子项</Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(Item);
