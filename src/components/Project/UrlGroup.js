import React from 'react';
import PropTypes from 'prop-types';
import { Table, message } from 'antd';
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

class UrlGroup extends React.Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    updateUrl: PropTypes.func.isRequired,
    updateResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    updateUrlResult: PropTypes.shape({
      code: PropTypes.number.isRequired
    }),
    urlGroups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired
    })),
    envs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired
    }))
  };

  static defaultProps = {
    urlGroups: [],
    envs: [],
    updateResult: undefined,
    updateUrlResult: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      envs: props.envs,
      urlGroups: props.urlGroups
    };
  }

  componentWillReceiveProps(nextProps) {
    const { urlGroups, envs, updateResult, updateUrlResult } = nextProps;
    if (urlGroups !== this.props.urlGroups) {
      this.setState({ urlGroups });
    }
    if (envs !== this.props.envs) {
      this.setState({ envs });
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
    const { urlGroups } = this.state;
    const index = findIndex(urlGroups, { id: urlGroup.id });
    if (index !== -1) {
      urlGroups[index] = urlGroup;
    }
  }

  onUrlCellChange = (urlGroupIndex, urlIndex, key) => ((value) => {
    const { urlGroups } = this.state;
    const dataSource = [...urlGroups[urlGroupIndex].urls];
    this.props.updateUrl({
      ...dataSource[urlIndex],
      [key]: value,
      urlGroupId: urlGroups[urlGroupIndex].id
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

  expandedRowRender = (item, urlGroupIndex) => {
    const { envs } = this.state;
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
    const { urlGroups } = this.state;

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
