import React, { PureComponent } from 'react';
import _ from 'lodash';


export default class SwitchShow extends PureComponent {
  state = {
    isShow: false,
  }

  // child节点将被添加 handleClose方法，用来关闭
  static defaultProps = {
    node: null, // 开关
    defaultShow: false, // 默认显示隐藏
    onChange: isShow => isShow, // 显示隐藏事件，如果该方法有返回值，以返回值作为显示状态
  }

  componentDidMount() {
    this.setState({ isShow: this.props.defaultShow });
  }

  onChange = async (v) => {
    v = v === undefined ? !this.state.isShow : v;
    const res = await this.props.onChange(v);
    this.setState({ isShow: res === undefined ? v : res });
  }

  render() {
    let child = this.props.children ?
      React.cloneElement(this.props.children, { handleClose: () => this.onChange(false) }) : null;

    return (
      <React.Fragment>
        <span onClick={() => this.onChange()}>
          {this.props.node}
        </span>
        {this.state.isShow && child}
      </React.Fragment>
    )
  }
}
