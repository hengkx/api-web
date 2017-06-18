/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Select, Button, Radio } from 'antd';
import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';
import uuidV1 from 'uuid/v1';
import { Map, fromJS } from 'immutable';
import Value from './Value';
import './less/item.less';
import './less/form-item.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const paramTypes = ['string', 'object', 'number', 'boolean', 'datetime'];

class Item extends React.Component {

  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    item: PropTypes.instanceOf(Map).isRequired,
    del: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    addSub: PropTypes.func.isRequired,
    pathIndex: PropTypes.string.isRequired,
    children: PropTypes.element
  }

  static defaultProps = {
    children: undefined
  }

  constructor(props) {
    super(props);
    this.state = {
      values: [],
      item: props.item,
      // name: '',
      // type: 'string',
      // remark: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    if (nextProps.item !== this.props.item) {
      this.setState({ item });
    }
  }

  // componentDidMount() {
  //   this.props.form.validateFields();
  // }

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
    this.props.onChange({ values: { value: values } }, this.props.item);
  }

  handleDelClick = () => {
    this.props.del(this.props.pathIndex);
  }

  handleAddSubClick = () => {
    this.props.addSub(this.props.pathIndex);
  }
  handleNameChange = (e) => {
    const { item } = this.state;
    this.setState({ item: item.set('name', e.target.value) });
    this.change();
  }
  handleRemarkChange = (e) => {
    const { item } = this.state;
    this.setState({ item: item.set('remark', e.target.value) });
    this.change();
  }
  handleTypeChange = (e) => {
    const { item } = this.state;
    this.setState({ item: item.set('type', e.target.value) });
    this.change();
  }

  change = () => {
    this.props.onChange(this.state.item, this.props.pathIndex);
  }

  render() {
    const { item, values } = this.state;
    return (
      <li className="item">
        <div>
          <div>
            <div className="form-item">
              <label className="required">参数名称</label>
              <Input value={item.get('name')} onChange={this.handleNameChange} />
              <Button type="danger" onClick={this.handleDelClick}>删除</Button>
              <Button onClick={this.handleAddSubClick}>添加子项</Button>
            </div>
            <div className="form-item">
              <label className="required">参数类型</label>
              <RadioGroup value={item.get('type')} onChange={this.handleTypeChange}>
                {paramTypes.map(paramType =>
                  <RadioButton key={paramType} value={paramType}>{paramType}</RadioButton>)}
              </RadioGroup>
            </div>
            <div className="form-item">
              <label >参数说明</label>
              <Input value={item.get('remark')} onChange={this.handleRemarkChange} />
            </div>
          </div>
          <div className="form-item">
            <label>值可能性</label>
            <div>
              {values.map(value => (<Value
                del={this.delValue}
                key={value.uuid}
                value={value}
                default={value.default}
                onChange={this.handleFieldChange}
              />))}
              <Button onClick={this.handleAddValueClick}>添加值</Button>
            </div>
          </div>
        </div>
        <div className="children">
          {this.props.children}
        </div>
      </li>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields, props.item);
  }
})(Item);
