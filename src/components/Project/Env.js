import React from 'react';
import { Table, Button, Input, message, Popconfirm } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import EditableCell from './EditableCell';

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

class Env extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    getList: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    getListResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    addResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    updateResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    delResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    getListResult: undefined,
    addResult: undefined,
    updateResult: undefined,
    delResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      envName: '',
      urls: [],
      projectId: props.params.id
    };
  }

  componentDidMount() {
    this.getEnvs();
  }

  componentWillReceiveProps(nextProps) {
    const { getListResult, addResult, delResult, updateResult } = nextProps;
    if (getListResult !== this.props.getListResult) {
      if (getListResult.code === 0) {
        this.setState({ envs: getListResult.data });
      } else {
        message.error(getListResult.message);
      }
    }
    if (addResult !== this.props.addResult) {
      if (addResult.code === 0) {
        message.success('添加环境成功！');
        this.setState({ envName: '' });
        this.getEnvs();
      } else {
        message.error(addResult.message);
      }
    }
    if (delResult !== this.props.delResult) {
      if (delResult.code === 0) {
        message.success('删除环境成功！');
        this.getEnvs();
      } else {
        message.error(delResult.message);
      }
    }
    if (updateResult !== this.props.updateResult) {
      if (updateResult.code === 0) {
        message.success('更新环境成功！');
        this.getEnvs();
      } else {
        message.error(updateResult.message);
      }
    }
  }

  getEnvs = () => {
    this.props.getList({ project: this.state.projectId });
  }
  handleDelClick = (env) => {
    this.props.del(env);
  }
  handleAddEnvClick = () => {
    const { envName, projectId } = this.state;
    if (!envName) return message.error('请填写环境名称');

    this.props.add({ project: projectId, name: envName });
  }
  onEnvCellChange = (index, key) => ((value) => {
    const { projectId, envs } = this.state;

    this.props.update({
      project: projectId,
      id: envs[index].id,
      [key]: value
    });
  })
  handleEnvNameChange = (e) => {
    this.setState({ envName: e.target.value });
  }
  render() {
    const { envs, envName } = this.state;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        render: (text, record, index) => (
          <EditableCell
            value={text}
            onChange={this.onEnvCellChange(index, 'name')}
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
      <div>
        <div className="table-oper">
          <InputGroup compact>
            <Input placeholder="环境名称" value={envName} onChange={this.handleEnvNameChange} style={{ width: '2rem' }} />
            <Button type="primary" onClick={this.handleAddEnvClick}>添加</Button>
          </InputGroup>
        </div>
        <Table
          rowKey="id"
          pagination={false}
          columns={columns}
          dataSource={envs}
        />
      </div>
    );
  }
}

export default Env;
