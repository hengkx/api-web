import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-fa';
import classNames from 'classnames';

const types = ['Object', 'String', 'Number', 'Boolean', 'File', '$Ref', 'Variable'];

class SelectType extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowSelect: false
    };
  }

  handleChange = (e) => {
    this.setState({ isShowSelect: false });
    this.props.onChange(e);
  }

  handleClick = () => {
    this.setState({ isShowSelect: true });
  }
  handleBlur = () => {
    this.setState({ isShowSelect: false });
  }
  render() {
    const { isShowSelect } = this.state;
    const { value } = this.props;
    return (
      <div style={{ position: 'relative' }} onBlur={this.handleBlur} tabIndex={0}>
        <span
          onClick={this.handleClick}
          style={{ userSelect: 'none' }}
          className={value.indexOf('[') !== -1 ? 't--array' : `t--${value.toLowerCase()}`}
        >
          {value}
        </span>
        {isShowSelect &&
          <div className="type-selector">
            <div className="row-details-section">
              <div className="row-details-section-name">基本类型</div>
              <div className="row-details-section-items sl--box-list f">
                {types.map(item => (
                  <div
                    key={item}
                    onClick={() => this.handleChange(item)}
                    className={classNames('row-details-section-item', { [`t--${value.toLowerCase()}`]: item === value }, { on: item === value })}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="row-details-section">
              <div className="row-details-section-name">数组类型</div>
              <div className="row-details-section-items sl--box-list f">
                {types.map(item => (
                  <div
                    key={`[${item}]`}
                    onClick={() => this.handleChange(`[${item}]`)}
                    className={classNames('row-details-section-item', { 't--array': `[${item}]` === value }, { on: `[${item}]` === value })}
                  >
                    [{item}]
                  </div>
                ))}
              </div>
            </div>
            <Icon name="caret-up" className="type-selector-caret" />
          </div>
        }
      </div>
    );
  }
}

export default SelectType;
