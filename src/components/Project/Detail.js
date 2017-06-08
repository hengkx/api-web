import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Form, Input } from 'antd';
import find from 'lodash/find';

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
    addProject: PropTypes.func.isRequired,
    getProjectByIdResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    addProjectResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    getProjectByIdResult: undefined,
    addProjectResult: undefined
  };


  constructor(props) {
    super(props);
    this.state = {
      project: {}
    };
  }

  componentDidMount() {
    this.props.getProjectById(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { getProjectByIdResult } = nextProps;
    if (getProjectByIdResult !== this.props.getProjectByIdResult) {
      this.setState({ project: getProjectByIdResult.data });
    }
  }

  render() {
    const { project } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <div>
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

            <Tabs defaultActiveKey="default">
              {project.envs &&
                project.envs.map(item => (
                  <TabPane tab={item.name} key={item.name}>
                    {project.urlGroups &&
                      project.urlGroups.map(urlGroup => (
                        <Input
                          key={urlGroup.id}
                          addonBefore={urlGroup.name}
                          defaultValue={find(urlGroup.urls, { env_id: item.id }).url}
                        />
                      ))
                    }
                  </TabPane>
                ))
              }
            </Tabs>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Form.create()(Detail);
