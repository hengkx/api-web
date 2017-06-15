import React from 'react';
import PropTypes from 'prop-types';
import { Table, message, Input, Button, Popconfirm } from 'antd';
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
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    update: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    getListByProjectId: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
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
    getListByProjectIdResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    delResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    urls: [],
    project: undefined,
    updateResult: undefined,
    updateUrlResult: undefined,
    addResult: undefined,
    getProjectUrlResult: undefined,
    getListByProjectIdResult: undefined,
    delResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      envs: [],
      urlGroups: [],
      name: '',
      projectId: props.params.id
    };
  }
  componentDidMount() {
    this.getData();
    this.props.getEnvs({ project: this.state.projectId });
  }

  componentWillReceiveProps(nextProps) {
    const { updateResult, getEnvsResult,
      updateUrlResult, getProjectUrlResult,
      addResult, delResult, getListByProjectIdResult } = nextProps;

    if (getEnvsResult !== this.props.getEnvsResult) {
      if (getEnvsResult.code === 0) {
        this.setState({ envs: getEnvsResult.data });
      } else {
        message.error(getEnvsResult.message);
      }
    }

    if (delResult !== this.props.delResult) {
      if (delResult.code === 0) {
        this.setState({ urlGroups: delResult.data });
        message.success('删除链接组成功！');
      } else {
        message.error(delResult.message);
      }
    }
    if (getListByProjectIdResult !== this.props.getListByProjectIdResult) {
      if (getListByProjectIdResult.code === 0) {
        this.setState({ urlGroups: getListByProjectIdResult.data });
      } else {
        message.error(getListByProjectIdResult.message);
      }
    }
    if (getProjectUrlResult !== this.props.getProjectUrlResult) {
      if (getProjectUrlResult.code === 0) {
        this.setState({ urls: getProjectUrlResult.data });
      } else {
        message.error(getProjectUrlResult.message);
      }
    }
    if (updateUrlResult !== this.props.updateUrlResult) {
      if (updateUrlResult.code === 0) {
        const { urls } = this.state;
        const index = findIndex(urls, { id: updateUrlResult.data.id });
        urls[index] = updateUrlResult.data;
        message.success('更新链接成功！');
      } else {
        message.error(updateUrlResult.message);
      }
    }
    if (updateResult !== this.props.updateResult) {
      if (updateResult.code === 0) {
        this.urlGroupChange(updateResult.data);
        message.success('修改链接组成功！');
      } else {
        message.error(updateResult.message);
      }
    }
    if (addResult !== this.props.addResult) {
      if (addResult.code === 0) {
        const urlGroups = [...this.state.urlGroups];
        urlGroups.push(addResult.data);
        this.setState({ name: '', urlGroups });
        message.success('添加链接组成功！');
        this.getData();
      } else {
        message.error(updateResult.message);
      }
    }
  }

  getData = () => {
    const { projectId } = this.state;
    this.props.getListByProjectId({ project: projectId });
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
        render: (value) => {
          const env = find(envs, { id: value });
          if (env) return env.name;
        }
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
        dataSource={filter(urls, { urlGroup: item.id }) || []}
        pagination={false}
      />
    );
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  handleAddUrlGroupClick = () => {
    const { name, projectId } = this.state;
    if (!name) return message.error('请填写链接组名称');

    this.props.add({ project: projectId, name });
  }

  handleDelClick = (urlGroup) => {
    this.props.del(urlGroup);
  }

  render() {
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
      ...timeColumns,
      {
        title: '操作',
        dataIndex: 'id',
        render: (text, item) => (<div>
          <Popconfirm
            title={`确认删除 ${item.name} 环境吗？`}
            onConfirm={() => { this.handleDelClick(item); }}
          >
            <a href="javascript:'">删除</a>
          </Popconfirm>
        </div>)
      }
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
          dataSource={urlGroups || []}
          expandedRowRender={this.expandedRowRender}
        />
      </div>
    );
  }
}

export default UrlGroup;
