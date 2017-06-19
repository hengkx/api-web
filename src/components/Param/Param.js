import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import uuidV1 from 'uuid/v1';
import { fromJS } from 'immutable';
// import remove from 'lodash/remove';
// import findIndex from 'lodash/findIndex';
import Item from './Item';
import './less/param.less';

class Param extends React.Component {
  static propTypes = {
    save: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({

    }))
  }

  static defaultProps = {
    save: () => { },
    onChange: () => { },
    value: undefined
  }


  constructor(props) {
    super(props);
    const value = props.value || [];
    this.state = {
      items: fromJS([...value])
    };

    // const c = fromJS([
    //   { a: 1, c: [{ b: 1 }] },
    //   { a: 2, c: [{ b: 3 }] }
    // ]);
    // const b = c.get(1).get('c').get(0).set('b', 5);
    // // const d = c.setIn([1, 'c', 0], { c: 777 });
    // const d = c.updateIn([1, 'c'], arr => arr.push({ c: 888 }));
    // console.log(b.toJS());
    // console.log(d.toJS());
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  handleChange = (item, pathIndex) => {
    const paths = this.getPaths(pathIndex);
    paths.pop();
    const items = this.state.items.setIn(paths, item);
    console.log(items.toJS());
    this.setState({ items });
  }

  validParams = (items) => {
    if (items) {
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (!item.name) return false;
        if (item.itemss) {
          for (let j = 0; j < item.itemss.length; j += 1) {
            if (!item.itemss[j].items) return false;
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
  getPaths = (pathIndex) => {
    const paths = [];
    const res = [];
    pathIndex.split('-').forEach(index => {
      if (index) {
        paths.push(parseInt(index, 0));
        res.push(parseInt(index, 0));
        res.push('children');
      }
    });
    return res;
  }

  delItem = (pathIndex) => {
    const paths = this.getPaths(pathIndex);
    paths.pop();
    const items = this.state.items.deleteIn(paths);
    this.setState({ items });
  }
  handleAddClick = (pathIndex) => {
    let items;
    const item = fromJS({ uuid: uuidV1(), values: [], children: [] });
    if (pathIndex) {
      items = this.state.items.updateIn(this.getPaths(pathIndex), children => children.push(item));
    } else {
      items = this.state.items.push(item);
    }
    console.log(items.toJS());
    this.setState({ items });
  }

  getTree = (items, preIndex = '', level = 0) => {
    if (!items || items.length === 0) return null;

    const node = (<ul>
      {items.map((item, index) =>
        (<Item
          key={item.get('uuid')}
          del={this.delItem}
          pathIndex={`${preIndex}${index}-`}
          item={item}
          onChange={this.handleChange}
          addSub={this.handleAddClick}
        >
          {this.getTree(item.get('children'), `${preIndex}${index}-`, level + 1)}
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
      </div>
    );
  }
}

export default Param;
