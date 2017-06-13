import React from 'react';
import { Button } from 'antd';
import Item from './Item';
import './less/param.less';

class Param extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  handleAddClick = () => {
    console.log('add');
    const items = [...this.state.items];
    items.push({});
    this.setState({ items });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="param">
        {items.map((item, index) =>
          <Item key={index} />
        )}

        <Button type="primary" onClick={this.handleAddClick}>添加</Button>
      </div>
    );
  }
}

export default Param;
