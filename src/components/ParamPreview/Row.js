import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';

class Row extends React.Component {
  static propTypes = {
    param: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onDel: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool
  }
  static defaultProps = {
    onChange: () => { },
    onDel: () => { },
    onBlur: () => { },
    readOnly: false
  }
  constructor(props) {
    super(props);
    this.state = {
      param: props.param
    };
  }
  componentWillReceiveProps(nextProps) {
    const { param } = nextProps;
    if (param !== this.props.param) {
      this.setState({ param });
    }
  }
  handleChange = (val, key) => {
    const { param } = this.state;
    param[key] = val;
    this.setState({ param });
    this.props.onChange(param, key);
  }
  handleDelClick = () => {
    this.props.onDel();
  }
  handleBlur = (key) => {
    const { readOnly } = this.props;
    if (!readOnly) this.props.onBlur(key);
  }
  render() {
    const { param } = this.state;
    const { readOnly } = this.props;
    return (
      <div className="editor-row">
        <div>
          {param.name || ''}
        </div>
        <div>
          {param.type || ''}
        </div>
        <div>
          {param.remark || ''}
        </div>
        <div className="required">
          <input
            type="checkbox"
            disabled
            checked={param.required || false}
          />
        </div>
        <div>
          {param.defaultValue || ''}
        </div>
        <div>
          {param.rule || ''}
        </div>
      </div>
    );
  }
}

export default Row;
