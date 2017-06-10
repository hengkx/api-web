import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Form, Input, Table, message } from 'antd';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import moment from 'moment';
import EditableCell from './EditableCell';
import './less/detail.less';

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
    update: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    getProjectByIdResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    projectUpdateEnvResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    updateResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    updateUrlResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
  };

  static defaultProps = {
    getProjectByIdResult: undefined,
    projectUpdateEnvResult: undefined,
    updateResult: undefined,
    updateUrlResult: undefined,
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
    const {
      getProjectByIdResult, projectUpdateEnvResult,
      updateResult, updateUrlResult
    } = nextProps;
    if (getProjectByIdResult !== this.props.getProjectByIdResult) {
      this.setState({ project: getProjectByIdResult.data });
    }
    if (projectUpdateEnvResult !== this.props.projectUpdateEnvResult) {
      if (projectUpdateEnvResult.code === 0) {
        this.setState({ project: projectUpdateEnvResult.data });
      } else {
        message.error(projectUpdateEnvResult.message);
      }
    }
    if (updateUrlResult !== this.props.updateUrlResult) {
      if (updateUrlResult.code === 0) {
        this.urlGroupChange(updateUrlResult.data);
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
  }

  urlGroupChange = (urlGroup) => {
    const project = this.state.project;
    const index = findIndex(project.urlGroups, { id: urlGroup.id });
    if (index !== -1) {
      project.urlGroups[index] = urlGroup;
    }
    this.setState({ project });
  }

  onUrlCellChange = (urlGroupIndex, urlIndex, key) => ((value) => {
    const { project } = this.state;
    const dataSource = [...project.urlGroups[urlGroupIndex].urls];
    this.props.updateUrl({
      ...dataSource[urlIndex],
      [key]: value,
      urlGroupId: project.urlGroups[urlGroupIndex].id
    });
  })
  onEnvCellChange = (index, key) => ((value) => {
    const { project } = this.state;
    const dataSource = [...project.envs];

    this.props.projectUpdateEnv({
      projectId: project.id,
      id: dataSource[index].id,
      [key]: value
    });
  })
  onUrlGroupCellChange = (index, key) => ((value) => {
    const { project } = this.state;
    const dataSource = [...project.urlGroups];

    this.props.update({
      ...dataSource[index],
      [key]: value
    }, { c: 1 });
  })

  expandedRowRender = (item, urlGroupIndex) => {
    const { envs } = this.state.project;
    const columns = [
      {
        title: '环境',
        dataIndex: 'env_id',
        render: (value) => find(envs, { id: value }).name
      },
      {
        title: '链接',
        dataIndex: 'url',
        render: (text, record, urlIndex) => (
          <EditableCell
            value={text}
            onChange={this.onUrlCellChange(urlGroupIndex, urlIndex, 'url')}
          />)
      },
      ...timeColumns
    ];

    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={item.urls}
        pagination={false}
      />
    );
  };

  render() {
    const { project } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

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
            <Table
              rowKey="id"
              pagination={false}
              columns={envColumns}
              dataSource={project.envs}
            />
            <div className="sub-title">
              基本链接
            </div>
            <Table
              rowKey="id"
              pagination={false}
              columns={urlGroupColumns}
              dataSource={project.urlGroups}
              expandedRowRender={this.expandedRowRender}
            />

          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Form.create()(Detail);
