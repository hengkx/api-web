import React from 'react';
import PropTypes from 'prop-types';

class AutoWidthInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    minWidth: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    minWidth: 28,
    onChange: () => { }
  }

  constructor(props) {
    super(props);
    this.state = {
      inputWidth: props.minWidth
    };
  }

  componentDidMount() {
    this.updateInputWidth();
  }


  componentDidUpdate() {
    this.updateInputWidth();
  }

  updateInputWidth = () => {
    let width = Math.max(this.sizer.scrollWidth, this.placeholderSizer.scrollWidth) + 2;
    width = Math.max(width, this.props.minWidth);
    const { inputWidth } = this.state;
    if (inputWidth !== width) {
      this.setState({ inputWidth: width });
    }
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }
  render() {
    const { inputWidth } = this.state;
    const { value, placeholder } = this.props;
    return (
      <div style={{ display: 'inline-block' }}>
        <input
          style={{ width: inputWidth }}
          type="text"
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
        <div ref={(div) => { this.sizer = div; }} style={{ position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' }}>
          {value}
        </div>
        <div ref={(div) => { this.placeholderSizer = div; }} style={{ position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' }}>
          {placeholder}
        </div>
      </div>
    );
  }
}

export default AutoWidthInput;
