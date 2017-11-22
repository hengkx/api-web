import React from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';// eslint-disable-line no-unused-vars
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/tomorrow_night_eighties';
import Row from './Row';
import { toTree } from '../../utils';
import getParamsMockObj from '../../utils/getParamsMockObj';
import './less/param.less';

class Param extends React.Component {
  static propTypes = {
    interfaceId: PropTypes.string,
    project: PropTypes.string.isRequired,
    getList: PropTypes.func.isRequired,
    getListResult: PropTypes.object,
    isRequest: PropTypes.bool,
    isShowExample: PropTypes.bool,
  }
  static defaultProps = {
    onChange: () => { },
    isRequest: false,
    isShowExample: true
  }

  constructor(props) {
    super(props);
    this.state = {
      params: [],
      isRequest: props.isRequest
    };
  }
  componentDidMount() {
    this.getParamList();
  }

  componentWillReceiveProps(nextProps) {
    const { getListResult, isRequest } = nextProps;
    if (getListResult !== this.props.getListResult) {
      const { requestParams, data } = getListResult;
      if (requestParams.is_request === isRequest) {
        const params = toTree(data);
        this.setState({ params });
      }
    }
  }
  getParamList = () => {
    const { interfaceId, project, isRequest } = this.props;
    this.props.getList({ project, interface: interfaceId, is_request: isRequest });
  }
  getCurrentParam = (keys) => {
    const paths = keys.split('.');
    const { params } = this.state;
    if (!params[paths[1]].children) {
      params[paths[1]].children = [];
    }
    let current = params[paths[1]].children;
    for (let i = 2; i < paths.length; i += 1) {
      if (!current[paths[i]].children) {
        current[paths[i]].children = [];
      }
      current = current[paths[i]].children;
    }
    return current;
  }
  renderEditor = (params = [], parent = '') => {
    const { interfaceId } = this.props;
    return (
      <div className="editor">
        <div className="editor-core">
          <div className="editor-hd">
            <div>名称</div>
            <div>类型</div>
            <div>备注</div>
            <div className="required">必须</div>
            <div>默认值</div>
            <div>生成规则</div>
            <div className="action" />
          </div>
          <div className="editor-bd">
            {params.map((item, index) => (
              <div key={index}>
                <Row
                  readOnly={interfaceId && item._id && !item.interface}
                  param={item}
                />
                {item.type.indexOf('Object') !== -1 && item.children && item.children.length > 0 &&
                  <div className="nest">
                    {this.renderEditor(item.children, `${parent}.${index}`)}
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div >
    );
  };

  render() {
    const { params } = this.state;
    const { isShowExample } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <div className="param">
          {this.renderEditor(params)}
          {isShowExample &&
            <div className="preview">
              <AceEditor
                mode="json"
                theme="tomorrow_night_eighties"
                name="REQUEST_EXAMPLE"
                fontSize={14}
                width="100%"
                showPrintMargin={false}
                value={JSON.stringify(getParamsMockObj(params), null, 2)}
                editorProps={{ $blockScrolling: true }}
                readOnly
                maxLines={50}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Param;
