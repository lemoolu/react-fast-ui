function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { Popconfirm, Button, message } from 'antd';
import Fetch from './Fetch';
export default class Operate extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      history: []
    });

    _defineProperty(this, "onOk", () => {
      this.setState({
        history: [...this.state.history, {}]
      });
    });

    _defineProperty(this, "onResponse", () => {
      this.setState({
        history: []
      }, () => {
        this.props.onSuccess && this.props.onSuccess();
        message.success(this.props.successText ? this.props.successText : `${this.props.title}成功！`);
      });
    });
  }

  render() {
    const props = this.props;
    return React.createElement(React.Fragment, null, React.createElement(Fetch, _extends({}, this.props.fetch, {
      history: this.state.history,
      onResponse: this.onResponse
    })), React.createElement(Popconfirm, {
      placement: "top",
      title: props.confirmText ? props.confirmText : `确定${props.title}该条目吗？`,
      onConfirm: this.onOk,
      okText: props.okText,
      cancelText: props.cancelText,
      style: {
        zIndex: 9999999
      }
    }, React.createElement("a", null, props.title)));
  }

}

_defineProperty(Operate, "defaultProps", {
  fetch: null,
  title: '',
  // 提示标题
  confirmText: '',
  // 提示文案
  okText: '确定',
  // 确定按钮文本
  cancelText: '取消',
  // 取消按钮文本
  successText: '',
  // 成功按钮文本
  onSuccess: '' // 接口完成后回调

});