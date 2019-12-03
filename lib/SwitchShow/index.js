function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import _ from 'lodash';
export default class SwitchShow extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isShow: false
    });

    _defineProperty(this, "onChange", async v => {
      v = v === undefined ? !this.state.isShow : v;
      const res = await this.props.onChange(v);
      this.setState({
        isShow: res === undefined ? v : res
      });
    });
  }

  componentDidMount() {
    this.setState({
      isShow: this.props.defaultShow
    });
  }

  render() {
    let child = this.props.children ? React.cloneElement(this.props.children, {
      handleClose: () => this.onChange(false)
    }) : null;
    return React.createElement(React.Fragment, null, React.createElement("span", {
      onClick: () => this.onChange()
    }, this.props.node), this.state.isShow && child);
  }

}

_defineProperty(SwitchShow, "defaultProps", {
  node: null,
  // 开关
  defaultShow: false,
  // 默认显示隐藏
  onChange: isShow => isShow // 显示隐藏事件，如果该方法有返回值，以返回值作为显示状态

});