import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import queryString from 'query-string';
import { Form, Input, Table, Button, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import './less/interface.less';

const FormItem = Form.Item;

@Form.create()
class Interface extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    getListResult: PropTypes.object,
    addGroupResult: PropTypes.object,
    groups: PropTypes.array,
  }
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      projectId: id,
      interfaces: [],
      ids: []
    };
  }

  componentDidMount() {
    this.getInterfaceList();
  }
  componentWillReceiveProps(nextProps) {
    const { getListResult, addGroupResult } = nextProps;
    if (getListResult !== this.props.getListResult) {
      this.setState({ interfaces: getListResult.data });
    }
    if (addGroupResult !== this.props.addGroupResult) {
      if (addGroupResult.code === 0) {
        message.success('添加分组成功');
        this.setState({ visible: false });
      }
    }
  }

  getInterfaceList = (group) => {
    const { id } = this.props.match.params;
    if (group) {
      this.props.getList({ project: id, group });
    } else if (group === '') {
      this.props.getList({ project: id });
    } else {
      const parsed = queryString.parse(this.props.location.search);
      this.props.getList({ project: id, ...parsed });
    }
  }
  handleSelectedGroup = (group) => {
    const { match } = this.props;
    if (group) {
      this.props.history.push(`${match.url}?group=${group}`);
    } else {
      this.props.history.push(match.url);
    }
    this.getInterfaceList(group);
  }
  handleSaveGroup = () => {
    const { projectId, ids } = this.state;
    // this.props.batchSetGroup({ project: projectId, ids });
  }
  handleAddInterfaceClick = () => {
    const { match } = this.props;
    this.props.history.push(`${match.url}/edit`);
  }
  handleAddClick = () => {
    this.setState({ visible: true });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { id } = this.props.match.params;
        this.props.addGroup({ ...values, _id: id });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { match, groups, project, user } = this.props;
    const { interfaces, ids } = this.state;
    const columns = [
      {
        title: '接口名称',
        dataIndex: 'name',
        render: (text, record) =>
          (<Link to={`${match.url}/detail/${record._id}`}>{text}</Link>)
      },
      {
        title: '请求方式',
        dataIndex: 'method',
      },
      {
        title: '请求地址',
        dataIndex: 'display_url',
      },
      {
        title: '分组',
        dataIndex: 'group',
        render: (text) => (text ? text.name : '')
      },
      {
        title: '修改时间',
        dataIndex: 'updated_at',
        render: (text) =>
          (moment.unix(text).format('YYYY-MM-DD HH:mm:ss'))
      },
    ];
    if (user._id === project.user) {
      columns.push({
        title: '操作',
        dataIndex: '_id',
        render: (text) =>
          (<Link to={`${match.url}/edit/${text}`}>修改</Link>)
      });
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ ids: selectedRowKeys });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    };
    return (
      <div className="interface">
        <div className="action">
          <Button onClick={this.handleAddClick}>添加分组</Button>
          <Button onClick={this.handleAddInterfaceClick}>添加接口</Button>
        </div>
        <div className="content-wrapper">
          <ul className="group">
            <li onClick={() => this.handleSelectedGroup('')}>所有接口</li>
            <li onClick={() => this.handleSelectedGroup('-1')}>未分组</li>
            {groups.map(item => (
              <li key={item._id} onClick={() => this.handleSelectedGroup(item._id)}>{item.name}</li>
            ))}
          </ul>
          <div className="list">
            <Table rowSelection={rowSelection} rowKey="_id" dataSource={interfaces} columns={columns} />
          </div>
        </div>
        <Modal
          title="添加分组"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({ visible: false })}
        >
          <Form>
            <FormItem
              label="分组名称"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '' }],
              })(<Input />)}
            </FormItem>
            <FormItem
              label="URL"
            >
              {getFieldDecorator('url', {
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
// <Modal
// title="修改分组"
// visible={this.state.visible}
// onOk={this.handleSaveGroup}
// onCancel={() => this.setState({ visible: false })}
// >
// <Select
//   placeholder="选择分组"
//   style={{ width: '100%' }}
// >
//   <Option value="" >未分组</Option>
//   {groups.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
// </Select>
// </Modal>
export default Interface;
