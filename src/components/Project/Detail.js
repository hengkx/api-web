import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Form, Input, Table, Button, message } from 'antd';
import moment from 'moment';
import EditableCell from './EditableCell';
import UrlGroup from '../../containers/UrlGroup';
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

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class Detail extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
      getFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    getProjectById: PropTypes.func.isRequired,
    projectUpdateEnv: PropTypes.func.isRequired,
    getProjectByIdResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    projectUpdateEnvResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    getProjectByIdResult: undefined,
    projectUpdateEnvResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      project: {},
      envName: ''
    };
  }

  componentDidMount() {
    this.props.getProjectById({ id: this.props.params.id });
  }

  componentWillReceiveProps(nextProps) {
    const {
      getProjectByIdResult, projectUpdateEnvResult
    } = nextProps;
    if (getProjectByIdResult !== this.props.getProjectByIdResult) {
      if (getProjectByIdResult.code === 0) {
        this.setState({ project: getProjectByIdResult.data });
      } else {
        message.error(getProjectByIdResult.message);
      }
    }
    if (projectUpdateEnvResult !== this.props.projectUpdateEnvResult) {
      if (projectUpdateEnvResult.code === 0) {
        this.setState({ project: projectUpdateEnvResult.data });
      } else {
        message.error(projectUpdateEnvResult.message);
      }
    }
  }

  onEnvCellChange = (index, key) => ((value) => {
    const { project } = this.state;
    const dataSource = [...project.envs];

    this.props.projectUpdateEnv({
      projectId: project.id,
      id: dataSource[index].id,
      [key]: value
    });
  })
  handleEnvNameChange = (e) => {
    this.setState({ envName: e.target.value });
  }
  handleAddEnvClick = () => {
    const { envName } = this.state;
    if (!envName) return message.error('请填写环境名称');
  }
  render() {
    const { project, envName } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const envColumns = [
      {
        title: '名称',
        dataIndex: 'name',
        render: (text, record, index) => (
          <EditableCell
            value={text}
            onChange={this.onEnvCellChange(index, 'name')}
          />)
      },
      ...timeColumns
    ];
    console.log(project);
    return (
      <div className="detail">
        <Tabs defaultActiveKey="3">
          <TabPane tab="接口文档" key="1">Content of Tab 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
          <TabPane tab="项目设置" key="3">
            <Form>
              <FormItem
                label="项目名称"
                {...formItemLayout}
              >
                {getFieldDecorator('name', {
                  initialValue: project.name,
                  rules: [{ required: true, message: '请输入项目名称!' }],
                })(<Input />)}
              </FormItem>
              <FormItem
                label="版本号"
                {...formItemLayout}
              >
                {getFieldDecorator('version', {
                  initialValue: project.version,
                  rules: [{ required: true, message: '请输入项目版本号!' }],
                })(<Input />)}
              </FormItem>
            </Form>
            <div className="sub-title">
              项目环境
            </div>
            <div className="table-oper">
              <InputGroup compact>
                <Input placeholder="环境名称" value={envName} onChange={this.handleEnvNameChange} style={{ width: '2rem' }} />
                <Button type="primary" onClick={this.handleAddEnvClick}>添加</Button>
              </InputGroup>
            </div>
            <Table
              rowKey="id"
              pagination={false}
              columns={envColumns}
              dataSource={project.envs}
            />
            <div className="sub-title">
              基本链接
            </div>
            <UrlGroup envs={project.envs} urlGroups={project.urlGroups} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Form.create()(Detail);
