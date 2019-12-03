import React, { PureComponent } from 'react';
import { Popconfirm, Button, message } from 'antd';
import Fetch from './Fetch';

export default class Operate extends PureComponent {
  state = {
    history: []
  }

  static defaultProps = {
    fetch: null,
    title: '', // 提示标题
    confirmText: '',  // 提示文案
    okText: '确定', // 确定按钮文本
    cancelText: '取消', // 取消按钮文本
    successText: '', // 成功按钮文本
    onSuccess: '', // 接口完成后回调
  }

  onOk = () => {
    this.setState({
      history: [...this.state.history, {}]
    });
  }
  onResponse = () => {
    this.setState({
      history: []
    }, () => {
      this.props.onSuccess && this.props.onSuccess();
      message.success(this.props.successText ? this.props.successText : `${this.props.title}成功！`);
    });
  }

  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <Fetch
          {...this.props.fetch}
          history={this.state.history}
          onResponse={this.onResponse}
        />
        <Popconfirm
          placement="top"
          title={props.confirmText ? props.confirmText : `确定${props.title}该条目吗？`}
          onConfirm={this.onOk}
          okText={props.okText}
          cancelText={props.cancelText}
          style={{zIndex: 9999999}}
        >
          <a>{props.title}</a>
        </Popconfirm>
      </React.Fragment>
    )
  }
}
