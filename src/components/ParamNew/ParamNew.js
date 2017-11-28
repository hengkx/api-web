import React from 'react';
import { Icon } from 'react-fa';
import AutoWidthInput from './AutoWidthInput';
import SelectType from './SelectType';
import './less/paramNew.less';

class ParamNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.params || [{ type: 'Object' }]
    };
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps;
    if (params !== this.props.params) {
      this.setState({ params });
    }
  }


  handleAddClick = (item) => {
    if (!item.children) item.children = [];// eslint-disable-line no-param-reassign
    item.children.push({ type: 'String' });
    item.open = true;// eslint-disable-line no-param-reassign
    this.forceUpdate();
  }
  handleNameChange = (param, e) => {
    param.name = e.target.value;// eslint-disable-line no-param-reassign
    this.forceUpdate();
  }
  handleTypeChange = (param, type) => {
    param.type = type;// eslint-disable-line no-param-reassign
    this.forceUpdate();
  }
  handleCollapseClick = (param) => {
    param.open = !param.open;// eslint-disable-line no-param-reassign
    this.forceUpdate();
  }
  renderParam = (params, level = 0, padding = 55) => {
    const res = [];
    params.forEach((param, index) => {
      res.push((
        <div key={`${level}-${index}`} className="row">
          <div className="detail">
            <Icon name="pencil" />
          </div>
          {(param.type === 'Object' || param.type === '[Object]') &&
            <div className="add" onClick={() => this.handleAddClick(param)}>
              <Icon name="plus" />
            </div>
          }
          <div className="row-wrapper">
            <div className="row-inner" style={{ paddingLeft: padding }}>
              {level !== 0 && (param.type === 'Object' || param.type === '[Object]') &&
                <div className="row-collapse-handle" onClick={() => this.handleCollapseClick(param)}>
                  <div className="row-collapse-handle-inner">
                    <Icon name={`caret-${param.open ? 'down' : 'right'}`} />
                  </div>
                </div>
              }
              {level !== 0 &&
                <div className="name">
                  <AutoWidthInput
                    placeholder="field"
                    value={param.name || ''}
                    onChange={e => this.handleNameChange(param, e)}
                  />
                </div>
              }
              <div className="type">
                {level !== 0 &&
                  <span className="t--spacer">:</span>
                }
                <SelectType
                  value={param.type}
                  onChange={(type) => this.handleTypeChange(param, type)}
                />
              </div>
              {level !== 0 &&
                <div className="row-meta-item">
                  <div className="remove">
                    <Icon name="close" />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      ));
      if (param.open && param.children) {
        res.push([...this.renderParam(param.children, level + 1, padding + 20)]);
      }
    });
    return res;
  }
  render() {
    const { params } = this.state;
    return (
      <div className="paramNew">
        <div className="panel-header">
          <div className="tab-bar">
            <div className="tabs">
              <div className="tab on">编辑</div>
              <div className="tab">例子</div>
            </div>
          </div>
        </div>
        <div className="panel-content">
          {this.renderParam(params)}
        </div>
      </div>
    );
  }
}

export default ParamNew;
