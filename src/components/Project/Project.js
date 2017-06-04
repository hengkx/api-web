import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Modal, message, Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router';
import './less/project.less';

const FormItem = Form.Item;

class Project extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    getAllProject: PropTypes.func.isRequired,
    addProject: PropTypes.func.isRequired,
    getAllProjectResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    addProjectResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    getAllProjectResult: undefined,
    addProjectResult: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      projects: []
    };
  }


  componentDidMount() {
    this.props.getAllProject();
  }

  componentWillReceiveProps(nextProps) {
    const { getAllProjectResult, addProjectResult } = nextProps;
    if (getAllProjectResult !== this.props.getAllProjectResult) {
      this.setState({ projects: getAllProjectResult.data });
    }
    if (addProjectResult !== this.props.addProjectResult) {
      if (getAllProjectResult.code === 0) {
        message.success('新增项目成功');
        this.props.getAllProject();
      } else {
        message.error(`新增项目失败 ${getAllProjectResult.message}`);
      }
    }
  }
  handleNewClick = () => {
    this.setState({ visible: true });
  }
  handleCancelClick = () => {
    this.setState({ visible: false });
  }
  handleSaveClick = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addProject(values);
        this.props.form.resetFields();
        this.setState({ visible: false });
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form;
    const { projects } = this.state;
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
        render: (value, item) =>
          (<Link to={`/project/${item.id}`}>{value}</Link>)
      },
      {
        title: '版本号',
        dataIndex: 'version'
      },
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
    return (
      <div className="project">
        <Button type="primary" onClick={this.handleNewClick}>新增项目</Button>
        <Table rowKey="id" columns={columns} dataSource={projects} />
        <Modal
          title="新增项目"
          visible={this.state.visible}
          onOk={this.handleSaveClick}
          onCancel={this.handleCancelClick}
        >
          <Form>
            <FormItem
              label="项目名称"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入项目名称!' }],
              })(<Input />)}
            </FormItem>
            <FormItem
              label="版本号"
              {...formItemLayout}
            >
              {getFieldDecorator('version', {
                initialValue: '1.0.0',
                rules: [{ required: true, message: '请输入项目版本号!' }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Project);
