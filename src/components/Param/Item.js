/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Radio } from 'antd';
import uuidV1 from 'uuid/v1';
import { Map, fromJS } from 'immutable';
import Value from './Value';
import withBase from '../Base';
import './less/item.less';
import './less/form-item.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const paramTypes = ['string', 'object', 'number', 'boolean', 'datetime'];

class Item extends React.Component {

  static propTypes = {
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
      item: props.item
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
    const item = this.state.item.update('values', arr => arr.push(fromJS({ uuid: uuidV1() })));
    this.setState({ item });
  }

  delValue = (index) => {
    const item = this.state.item.deleteIn(['values', index]);
    this.setState({ item });
  }
  handleValueChange = (value, index) => {
    let item = this.state.item.update('values', values => values.map(val => val.set('default', false)));
    item = item.setIn(['values', index], value);
    this.setState({ item });
    this.props.onChange(item, this.props.pathIndex);
  }

  handleDelClick = () => {
    this.props.del(this.props.pathIndex);
  }

  handleAddSubClick = () => {
    this.props.addSub(this.props.pathIndex);
  }
  handleChange = (e) => {
    const { item } = this.state;
    this.setState({ item: item.set(e.target.name, e.target.value) });
    this.props.onChange(this.state.item, this.props.pathIndex);
  }

  render() {
    const { item } = this.state;
    console.count('item render');
    return (
      <li className="item">
        <div>
          <div>
            <div className="form-item">
              <label className="required">参数名称</label>
              <Input name="name" value={item.get('name')} onChange={this.handleChange} />
              <Button type="danger" onClick={this.handleDelClick}>删除</Button>
              <Button onClick={this.handleAddSubClick}>添加子项</Button>
            </div>
            <div className="form-item">
              <label className="required">参数类型</label>
              <RadioGroup value={item.get('type')} onChange={this.handleChange}>
                {paramTypes.map(paramType =>
                  <RadioButton name="type" key={paramType} value={paramType}>{paramType}</RadioButton>)}
              </RadioGroup>
            </div>
            <div className="form-item">
              <label >参数说明</label>
              <Input name="remark" value={item.get('remark')} onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-item">
            <label>值可能性</label>
            <div>
              {item.get('values').map((value, index) => (<Value
                del={this.delValue}
                key={value.get('uuid')}
                value={value}
                index={index}
                onChange={this.handleValueChange}
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

export default withBase(Item);
