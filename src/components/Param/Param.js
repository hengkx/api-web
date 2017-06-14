import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import uuidV1 from 'uuid/v1';
// import remove from 'lodash/remove';
// import findIndex from 'lodash/findIndex';
import Item from './Item';
import './less/param.less';

class Param extends React.Component {
  static propTypes = {
    save: PropTypes.func
  }

  static defaultProps = {
    save: () => { }
  }


  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  // handleAddClick = () => {
  //   const items = [...this.state.items];
  //   items.push({ uuid: uuidV1() });
  //   this.setState({ items });
  // }
  handleChange = (changedFields, item) => {
    Object.keys(changedFields).forEach(key => {
      item[key] = changedFields[key].value;// eslint-disable-line no-param-reassign
    });
    const items = this.state.items.slice();
    this.setState({ items });
  }

  validParams = (items) => {
    if (items) {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (!item.name) return false;
        if (item.values) {
          for (let j = 0; j < item.values.length; j += 1) {
            if (!item.values[j].value) return false;
          }
        }
        if (this.validParams(item.children) === false) return false;
      }
      return true;
    }
  }

  handleSaveClick = () => {
    const { items } = this.state;
    if (this.validParams(items)) this.props.save(this.state.items);
  }

  getParent = (items, pathIndex) => {
    const paths = [];
    pathIndex.split('-').forEach(index => {
      if (index) {
        paths.push(parseInt(index, 0));
      }
    });
    let parent = items;
    for (let i = 0; i < paths.length - 1; i += 1) {
      parent = parent[paths[i]].children;
    }
    const index = paths[paths.length - 1];
    return { parent, index, current: parent[index] };
  }

  delItem = (pathIndex) => {
    const items = this.state.items.slice();
    const { parent, index } = this.getParent(items, pathIndex);
    parent.splice(index, 1);
    this.setState({ items });
  }
  handleAddClick = (pathIndex) => {
    const items = this.state.items.slice();
    const item = { uuid: uuidV1() };
    if (pathIndex) {
      const { current } = this.getParent(items, pathIndex);
      if (!current.children) current.children = [];
      current.children.push(item);
    } else {
      items.push(item);
    }
    this.setState({ items });
  }

  getTree = (items, preIndex = '', level = 0) => {
    if (!items) return;

    const node = (<ul>
      {items.map((item, index) =>
        (<Item
          key={item.uuid}
          del={this.delItem}
          pathIndex={`${preIndex}${index}-`}
          item={item}
          onChange={this.handleChange}
          addSub={this.handleAddClick}
        >
          {this.getTree(item.children, `${preIndex}${index}-`, level + 1)}
        </Item>))
      }
    </ul>);

    return node;
  }

  render() {
    const { items } = this.state;
    return (
      <div className="param">
        {this.getTree(items)}
        <Button onClick={() => { this.handleAddClick(); }}>添加</Button>
        <Button type="primary" onClick={this.handleSaveClick}>保存</Button>
      </div>
    );
  }
}

export default Param;
