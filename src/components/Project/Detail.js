import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Tabs, Form, Input, Table, Button, message, Popconfirm } from 'antd';
import findIndex from 'lodash/findIndex';
import './less/detail.less';

const InputGroup = Input.Group;

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
    projectAddEnv: PropTypes.func.isRequired,
    projectDeleteEnv: PropTypes.func.isRequired,
    getProjectByIdResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    projectUpdateEnvResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    projectAddEnvResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    projectDeleteEnvResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    getProjectByIdResult: undefined,
    projectUpdateEnvResult: undefined,
    projectAddEnvResult: undefined,
    projectDeleteEnvResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      project: {},
      envName: '',
      urls: []
    };
  }

  componentDidMount() {
    this.getProject();
  }

  componentWillReceiveProps(nextProps) {
    const {
      getProjectByIdResult, projectUpdateEnvResult,
      projectAddEnvResult, projectDeleteEnvResult
    } = nextProps;
    if (projectDeleteEnvResult !== this.props.projectDeleteEnvResult) {
      if (projectDeleteEnvResult.code === 0) {
        this.getProject();
      } else {
        message.error(projectDeleteEnvResult.message);
      }
    }
    if (getProjectByIdResult !== this.props.getProjectByIdResult) {
      if (getProjectByIdResult.code === 0) {
        this.setState({ project: getProjectByIdResult.data });
      } else {
        message.error(getProjectByIdResult.message);
      }
    }
    if (projectUpdateEnvResult !== this.props.projectUpdateEnvResult) {
      if (projectUpdateEnvResult.code === 0) {
        this.envChange(projectUpdateEnvResult.data);
      } else {
        message.error(projectUpdateEnvResult.message);
      }
    }
    if (projectAddEnvResult !== this.props.projectAddEnvResult) {
      if (projectAddEnvResult.code === 0) {
        const project = { ...this.state.project };
        project.envs.push(projectAddEnvResult.data);
        this.setState({ project, envName: '' });
      } else {
        message.error(projectAddEnvResult.message);
      }
    }
  }

  getProject = () => {
    this.props.getProjectById({ id: this.props.params.id });
  }

  envChange = (env) => {
    const project = { ...this.state.project };
    const index = findIndex(project.envs, { id: env.id });
    if (index !== -1) {
      project.envs[index] = env;
      this.setState({ project });
    }
  }

  render() {
    const { project, envName } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };


    return (
      <div className="detail">
        <div className="side-menu">
          <Menu>
            <Menu.Item>aa</Menu.Item>
            <Menu.Item>aa</Menu.Item>
            <Menu.Item>aa</Menu.Item>
            <Menu.Item>项目环境</Menu.Item>
            <Menu.Item>基本链接</Menu.Item>
          </Menu>
        </div>
        <div className="content">
          {this.props.children}
          {/*<Tabs defaultActiveKey="3">
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
                基本链接
            </div>
              <UrlGroup project={project} />
            </TabPane>
          </Tabs>*/}
        </div>
      </div>
    );
  }
}

export default Form.create()(Detail);
