import React from 'react';
import PropTypes from 'prop-types';
import { message, Button, Form, Input } from 'antd';
import { Route, NavLink } from 'react-router-dom';
import Interface from '../../containers/Interface';
import InterfaceAdd from '../../containers/InterfaceAdd';
import InterfaceEdit from '../../containers/InterfaceEdit';
import InterfaceDetail from '../../containers/InterfaceDetail';
import ProjectSetting from '../../containers/ProjectSetting';
import './less/detail.less';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class Detail extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    getById: PropTypes.func.isRequired,
    getGroup: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    getByIdResult: PropTypes.object,
    getGroupResult: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      project: {},
      groups: [],
      tab: 'interface',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getById({ id });
    this.props.getGroup({ id });
  }
  componentWillReceiveProps(nextProps) {
    const { getByIdResult, getGroupResult } = nextProps;
    if (getByIdResult !== this.props.getByIdResult) {
      this.setState({ project: getByIdResult.data });
    }
    if (getGroupResult !== this.props.getGroupResult) {
      this.setState({ groups: getGroupResult.data });
    }

  }
  handleTabChange = (key) => {
    this.setState({ tab: key });
  }

  render() {
    const { match, location } = this.props;
    const tabList = [
      {
        key: 'interface',
        tab: '接口列表',
      },
      {
        key: 'db',
        tab: '数据库',
      },
      {
        key: 'setting',
        tab: '设置',
      },
    ];
    const action = (
      <div>
        <Button.Group>
          <Button onClick={this.handleAddClick}>添加分组</Button>
          <Button onClick={this.handleAddInterfaceClick}>添加接口</Button>
        </Button.Group>
      </div>
    );
    // if (match.isExact) {
    const { project, tab, groups } = this.state;
    return (
      <div className="project-detail">
        <ul className="sidebar">
          <li><NavLink activeClassName="active" to={`${match.url}/api`}>接口列表</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/db`}>数据库</NavLink></li>
          <li><NavLink activeClassName="active" to={`${match.url}/setting`}>设置</NavLink></li>
        </ul>
        <div className="project-content">
          <Route exact path={`${match.path}/setting`} component={ProjectSetting} />
          <Route exact path={`${match.path}/api`} component={Interface} />
          <Route exact path={`${match.path}/api/edit`} component={InterfaceAdd} />
          <Route exact path={`${match.path}/api/edit/:interfaceId`} component={InterfaceEdit} />
          <Route exact path={`${match.path}/api/detail/:interfaceId`} component={InterfaceDetail} />
        </div>
      </div>
    );
  }
}
export default Detail;
