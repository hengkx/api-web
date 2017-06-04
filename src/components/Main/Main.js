import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import './less/main.less';

const { Header, Content } = Layout;


class Index extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', width: '100%' }}>
          <div className="logo">API Doc</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">项目管理</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ marginTop: 64, backgroundColor: '#fff' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default Index;
