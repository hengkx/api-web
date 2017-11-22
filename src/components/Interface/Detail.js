import React from 'react';
import PropTypes from 'prop-types';
import { Select, Card } from 'antd';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import Param from '../../containers/ParamPreview';

const Option = Select.Option;
const { Description } = DescriptionList;

class Edit extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    getById: PropTypes.func.isRequired,
    getByIdResult: PropTypes.object,
    project: PropTypes.object,
    groups: PropTypes.array,
  }
  constructor(props) {
    super(props);
    this.state = {
      api: {}
    };
  }

  componentDidMount() {
    const { interfaceId, id } = this.props.match.params;
    this.props.getById({ id: interfaceId, project: id });
  }
  componentWillReceiveProps(nextProps) {
    const { getByIdResult } = nextProps;
    if (getByIdResult !== this.props.getByIdResult) {
      this.setState({ api: getByIdResult.data });
    }
  }

  render() {
    const { project, groups } = this.props;
    const { interfaceId, id } = this.props.match.params;
    const { api } = this.state;
    const prefixSelector = (
      <Select
        value={api.method}
        onChange={(val) => this.handleChange(val, 'method')}
        style={{ width: 70 }}
      >
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="PATCH">PATCH</Option>
        <Option value="DELETE">DELETE</Option>
      </Select>
    );
    return (
      <div>
        <Card title="基础信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList>
            <Description term="接口名称">{api.name}</Description>
            <Description term="接口分组">{api.group ? api.group.name : '未分组'}</Description>
            <Description term="接口方式">{api.method}</Description>
            <Description term="接口地址">{api.display_url}</Description>
            <Description term="接口备注">{api.remark}</Description>
            <Description term="Mock地址"><a href={`${window.baseURL}mock/${project._id}/${api.url}`} target="_blank">{`${window.baseURL}mock/${project._id}/${api.url}`}</a></Description>
          </DescriptionList>
        </Card>
        <Card title="请求参数" style={{ marginBottom: 24 }} bordered={false}>
          <Param
            isRequest
            interfaceId={interfaceId}
            project={id}
          />
        </Card>
        <Card title="响应参数" style={{ marginBottom: 24 }} bordered={false}>
          <Param
            interfaceId={interfaceId}
            project={id}
          />
        </Card>
      </div>
    );
  }
}

export default Edit;
