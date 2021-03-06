import React from 'react';
import PropTypes from 'prop-types';
import './less/select.less';

const options = [
  { label: 'Object', value: 'Object' },
  {
    label: 'Array',
    value: 'Array',
    childrens: [
      { label: '[Object]', value: '[Object]' },
      { label: '[String]', value: '[String]' },
      { label: '[Boolean]', value: '[Boolean]' },
      { label: '[Number]', value: '[Number]' }
    ]
  },
  { label: 'String', value: 'String' },
  { label: 'Boolean', value: 'Boolean' },
  { label: 'Number', value: 'Number' },
  { label: 'Variable', value: 'Variable' },
];

function getItem(value) {
  for (let i = 0; i < options.length; i += 1) {
    const opt = options[i];
    if (opt.value === value) {
      return opt;
    }
    if (opt.childrens) {
      for (let j = 0; j < opt.childrens.length; j += 1) {
        const child = opt.childrens[j];
        if (child.value === value) {
          return { ...child, parent: opt.value };
        }
      }
    }
  }
}

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    style: PropTypes.object
  }
  static defaultProps = {
    onChange: () => { },
    value: '',
    readOnly: false
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowSelect: false,
      selected: getItem(props.value)
    };
  }
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ selected: getItem(value) });
    }
  }

  handleSelectedClick = (e, option) => {
    if (!option.children) {
      e.stopPropagation();
      this.setState({ selected: option, isShowSelect: false });
      this.props.onChange(option.value);
    }
  }
  handleChildSelectedClick = (e, parent, child) => {
    e.stopPropagation();
    this.setState({ selected: { ...child, parant: parent.value }, isShowSelect: false });
    this.props.onChange(child.value);
  }
  handleClick = () => {
    const { readOnly } = this.props;
    if (!readOnly) {
      this.setState({ isShowSelect: true });
    }
  }
  handleBlur = () => {
    this.setState({ isShowSelect: false });
  }
  getClass = (item) => {
    const { selected } = this.state;
    if (!selected) return '';
    if (item.value === selected.value || selected.parent === item.value) {
      return 'selected';
    }
  }
  render() {
    const { selected, isShowSelect } = this.state;
    const { style } = this.props;
    return (
      <div className="select" style={style} onBlur={this.handleBlur} tabIndex={0}>
        <div className="select-hd" onClick={this.handleClick}>
          {selected ? selected.label : ''}
        </div>
        {isShowSelect &&
          <ul className="select-bd">
            {options.map(item => (
              <li
                key={item.label}
                className={this.getClass(item)}
                onClick={(e) => this.handleSelectedClick(e, item)}
              >
                {item.label}
                {item.childrens &&
                  <ul className="select-children">
                    {item.childrens.map(child => (
                      <li
                        key={child.label}
                        className={this.getClass(child)}
                        onClick={(e) => this.handleChildSelectedClick(e, item, child)}
                      >
                        {child.label}
                      </li>
                    ))}
                  </ul>
                }
              </li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

export default Select;
