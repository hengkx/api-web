import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Form, Input, Table } from 'antd';
import find from 'lodash/find';
import moment from 'moment';
import EditableCell from './EditableCell';

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
    getProjectByIdResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    })
  };

  static defaultProps = {
    getProjectByIdResult: undefined,
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

  onCellChange = (urlGroupIndex, urlIndex, key) => {
    return (value) => {
      const { project } = this.state;
      const dataSource = [...project.urlGroups[urlGroupIndex].urls];
      dataSource[urlIndex][key] = value;
      this.setState({ dataSource });
    };
  }

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
            onChange={this.onCellChange(urlGroupIndex, urlIndex, 'url')}
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
      },
      ...timeColumns
    ];

    const envColumns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      ...timeColumns
    ];
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
            <Table
              rowKey="id"
              pagination={false}
              columns={urlGroupColumns}
              dataSource={project.urlGroups}
              expandedRowRender={this.expandedRowRender}
            />
            <Table
              rowKey="id"
              pagination={false}
              columns={envColumns}
              dataSource={project.envs}
            />
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
