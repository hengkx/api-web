import React from 'react';
import PropTypes from 'prop-types';
import { Table, message, Input, Button } from 'antd';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import moment from 'moment';
import filter from 'lodash/filter';
import EditableCell from './EditableCell';
import './less/detail.less';

const InputGroup = Input.Group;

const timeColumns = [
  {
    title: '创建时间',
    dataIndex: 'create_date',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '最后修改时间',
    dataIndex: 'update_date',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
  }
];

class UrlGroup extends React.Component {
  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.string
    }),
    update: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    getProjectUrl: PropTypes.func.isRequired,
    updateResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    updateUrlResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    addResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    getProjectUrlResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    urls: [],
    project: undefined,
    updateResult: undefined,
    updateUrlResult: undefined,
    addResult: undefined,
    getProjectUrlResult: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      envs: [],
      urlGroups: [],
      name: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { project, updateResult,
      updateUrlResult, getProjectUrlResult,
      addResult } = nextProps;
    console.log('componentWillReceiveProps');
    // if (projectId !== this.props.projectId && projectId) {
    //   this.getProjectUrl(projectId);
    // }

    if (getProjectUrlResult !== this.props.getProjectUrlResult) {
      if (getProjectUrlResult.code === 0) {
        this.setState({ urls: getProjectUrlResult.data });
      } else {
        message.error(getProjectUrlResult.message);
      }
    }
    if (project && project !== this.props.project) {
      this.setState({ urlGroups: project.urlGroups, envs: project.envs });
      this.getProjectUrl(project.id);
    }
    if (updateUrlResult !== this.props.updateUrlResult) {
      if (updateUrlResult.code === 0) {
        const { urls } = this.state;
        const index = findIndex(urls, { id: updateUrlResult.data.id });
        urls[index] = updateUrlResult.data;
      } else {
        message.error(updateUrlResult.message);
      }
    }
    if (updateResult !== this.props.updateResult) {
      if (updateResult.code === 0) {
        this.urlGroupChange(updateResult.data);
      } else {
        message.error(updateResult.message);
      }
    }
    if (addResult !== this.props.addResult) {
      if (addResult.code === 0) {
        this.state.urlGroups.push(addResult.data);
        this.setState({ name: '' });
        this.getProjectUrl(project.id);
      } else {
        message.error(updateResult.message);
      }
    }
  }

  getProjectUrl = (projectId) => {
    this.props.getProjectUrl({ id: projectId });
  }
  urlGroupChange = (urlGroup) => {
    const { urlGroups } = this.state;
    const index = findIndex(urlGroups, { id: urlGroup.id });
    if (index !== -1) {
      urlGroups[index] = urlGroup;
    }
  }

  onUrlCellChange = (urlId, urlIndex, key) => ((value) => {
    const { urls } = this.state;
    const url = find(urls, { id: urlId });
    this.props.updateUrl({
      ...url,
      [key]: value,
      urlGroupId: url.urlGroup
    });
  })

  onUrlGroupCellChange = (index, key) => ((value) => {
    const { urlGroups } = this.state;
    const dataSource = [...urlGroups];

    this.props.update({
      ...dataSource[index],
      [key]: value
    });
  })

  expandedRowRender = (item) => {
    const { envs, urls } = this.state;
    const columns = [
      {
        title: '环境',
        dataIndex: 'env',
        render: (value) => find(envs, { id: value }).name
      },
      {
        title: '链接',
        dataIndex: 'url',
        render: (text, record, urlIndex) => (
          <EditableCell
            value={text}
            onChange={this.onUrlCellChange(record.id, urlIndex, 'url')}
          />)
      },
      ...timeColumns
    ];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filter(urls, { urlGroup: item.id })}
        pagination={false}
      />
    );
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  handleAddUrlGroupClick = () => {
    const { name } = this.state;
    if (!name) return message.error('请填写链接组名称');

    this.props.add({ id: this.props.project.id, name });
  }
  render() {
    console.count('urlgroup render');
    const { urlGroups, name } = this.state;

    const urlGroupColumns = [
      {
        title: '名称',
        dataIndex: 'name',
        render: (text, record, index) => (
          <EditableCell
            value={text}
            onChange={this.onUrlGroupCellChange(index, 'name')}
          />)
      },
      ...timeColumns
    ];
    return (
      <div className="UrlGroup">
        <div className="table-oper">
          <InputGroup compact>
            <Input placeholder="链接组名称" value={name} onChange={this.handleNameChange} style={{ width: '2rem' }} />
            <Button type="primary" onClick={this.handleAddUrlGroupClick}>添加</Button>
          </InputGroup>
        </div>
        <Table
          rowKey="id"
          pagination={false}
          columns={urlGroupColumns}
          dataSource={urlGroups}
          expandedRowRender={this.expandedRowRender}
        />
      </div>
    );
  }
}

export default UrlGroup;
