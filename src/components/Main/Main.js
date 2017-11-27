import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon as AntdIcon, Dropdown, Avatar, Spin } from 'antd';
import { parse as urlParse } from 'url';
import { Icon } from 'react-fa';
import { Route, Link } from 'react-router-dom';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import Project from '../../containers/Project';
import './less/main.less';

const { Header, Content } = Layout;

class Main extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getInfo: PropTypes.func.isRequired,
    getInfoResult: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    if (this.props.match.isExact) {
      this.props.history.push('/project');
    }
  }

  componentDidMount() {
    this.props.getInfo();
  }
  componentWillReceiveProps(nextProps) {
    const { getInfoResult } = nextProps;
    if (getInfoResult !== this.props.getInfoResult) {
      this.setState({ user: getInfoResult.data });
    }
  }

  handleChange = (val) => {
    this.setState({ program: val });
  }

  render() {
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled><AntdIcon type="user" />个人中心</Menu.Item>
        <Menu.Item disabled><AntdIcon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><AntdIcon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    const currentUser = {};
    const noticeData = {};
    const { user } = this.state;
    return (
      <div className="container">
        <Header className="header">
          <Link to="/project">首页</Link>
          <Icon name="rocket" />
          <div className="right">
            <NoticeIcon
              className="action"
              count={currentUser.notifyCount}
              onItemClick={(item, tabProps) => {
                console.log(item, tabProps); // eslint-disable-line
              }}
              onClear={this.handleNoticeClear}
              onPopupVisibleChange={this.handleNoticeVisibleChange}
              // loading={fetchingNotices}
              popupAlign={{ offset: [20, -16] }}
            >
              <NoticeIcon.Tab
                list={noticeData['通知']}
                title="通知"
                emptyText="你已查看所有通知"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
              />
              <NoticeIcon.Tab
                list={noticeData['消息']}
                title="消息"
                emptyText="您已读完所有消息"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
              />
              <NoticeIcon.Tab
                list={noticeData['待办']}
                title="待办"
                emptyText="你已完成所有待办"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
              />
            </NoticeIcon>
            {user.name ? (
              <Dropdown overlay={menu}>
                <span className="action header-account">
                  <Avatar size="small" className="avatar" src={user.avatar} />
                  {user.name}
                </span>
              </Dropdown>
            ) : <Spin size="small" style={{ marginLeft: 8 }} />}
          </div>
        </Header>
        {user.name &&
          <div style={{ flex: 1 }}>
            <Route path="/project" component={Project} />
          </div>
        }
      </div>
    );
  }
}

export default Main;
