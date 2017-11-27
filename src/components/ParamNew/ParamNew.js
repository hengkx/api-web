import React from 'react';
import { Icon } from 'react-fa';
import AutoWidthInput from './AutoWidthInput';
import './less/paramNew.less';

class ParamNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: [{ type: 'Object' }]
    };
  }
  handleAddClick = (item) => {
    if (!item.children) item.children = [];// eslint-disable-line no-param-reassign
    item.children.push({ type: 'String' });

    const { params } = this.state;
    this.setState(params);
  }
  handleNameChange = (param, e) => {
    param.name = e.target.value;// eslint-disable-line no-param-reassign
    const { params } = this.state;
    this.setState(params);
  }
  componentDidUpdate() {
    if (this.sizer) {

      const width = Math.max(this.sizer.scrollWidth, this.placeholderSizer.scrollWidth);
      console.log(width);
    }
  }

  getWidth = (param) => {
    if (!this.sizer) return 30;

    const width = Math.max(this.sizer.scrollWidth, this.placeholderSizer.scrollWidth);

    return width + 2;
  }

  renderParam = (params, level = 0, padding = 55) => {
    const types = ['Object', 'String', 'Number', 'Boolean', 'File', '$Ref', 'Variable'];
    const res = [];
    params.forEach(param => {
      res.push((
        <div key={param.type} className="row">
          <div className="detail">
            <Icon name="pencil" />
          </div>
          <div className="add" onClick={() => this.handleAddClick(param)}>
            <Icon name="plus" />
          </div>
          <div className="row-wrapper">
            <div className="row-inner" style={{ paddingLeft: padding }}>
              {level !== 0 &&
                <div className="row-collapse-handle">
                  <div className="row-collapse-handle-inner">
                    <Icon name="caret-right" />
                  </div>
                </div>
              }
              <div className="name">
                <AutoWidthInput
                  placeholder="field"
                  value={param.name || ''}
                  onChange={e => this.handleNameChange(param, e)}
                />
              </div>
              <div className="type ">
                <span className="t--spacer">:</span>
                <span className={`t--${param.type.toLowerCase()}`}>{param.type}</span>
                <div className="type-selector">
                  <div className="row-details-section">
                    <div className="row-details-section-name">基本类型</div>
                    <div className="row-details-section-items sl--box-list f">
                      {types.map(item => <div key={item} className="row-details-section-item f-0 f ai-c jc-c sl--array on">{item}</div>)}
                    </div>
                  </div>
                  <div className="row-details-section">
                    <div className="row-details-section-name">数组类型</div>
                    <div className="row-details-section-items sl--box-list f">
                      {types.map(item => <div key={`[${item}]`} className="row-details-section-item f-0 f ai-c jc-c sl--array on">[{item}]</div>)}
                    </div>
                  </div>
                  <Icon name="caret-up" className="type-selector-caret" />
                </div>
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
      if (param.children) {
        res.push([...this.renderParam(param.children, level + 1, padding + 20)]);
      }
    });
    return res;
  }
  render() {
    const { params } = this.state;
    if (this.div) {
      console.log(this.div.scrollWidth);
    }
    return (
      <div className="paramNew">
        {this.renderParam(params)}
      </div>
    );
  }
}

export default ParamNew;
