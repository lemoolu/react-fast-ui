function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { Button, Descriptions, Modal } from 'antd';
import Card from './Card';
import { withFetch } from './Fetch';
import _ from 'lodash';

class PageView extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClose", () => {
      console.log('onclose');
      this.props.handleClose && this.props.handleClose();
    });
  }

  render() {
    let {
      dataSource
    } = this.props;
    let content;

    if (_.get(this.props.columns, '[0].children')) {
      content = React.createElement("div", null, this.props.columns.map(info => React.createElement(Descriptions, {
        title: info.title,
        key: info.title
      }, _.get(info, 'children', []).map(x => React.createElement(Descriptions.Item, {
        label: x.title,
        key: x.title + x.dataIndex,
        span: x.span || 1
      }, x.render ? x.render(_.get(dataSource, x.dataIndex), dataSource || {}) : _.get(dataSource, x.dataIndex))))));
    } else {
      content = React.createElement(Descriptions, null, this.props.columns.map(x => React.createElement(Descriptions.Item, {
        label: x.title,
        key: x.title + x.dataIndex,
        span: x.span || 1
      }, x.render ? x.render(_.get(dataSource, x.dataIndex), dataSource || {}) : _.get(dataSource, x.dataIndex))));
    }

    if (this.props.type === 'page') {
      return React.createElement(Card, {
        title: this.props.title
      }, content);
    }

    if (this.props.type === 'content') {
      return content;
    }

    if (this.props.type === 'modal') {
      return React.createElement(Modal, _extends({
        title: this.props.title,
        footer: React.createElement(Button, {
          onClick: () => this.props.handleClose && this.props.handleClose(),
          type: "primary"
        }, "\u786E\u5B9A"),
        visible: true // zIndex={9999999}
        ,
        onCancel: this.onClose
      }, this.props.modalProps), content);
    }

    return 'Page View: 无效type';
  }

}

_defineProperty(PageView, "defaultProps", {
  type: 'page',
  // page | content | modal
  handleClose: null // modal模式关闭时调用

});

export default withFetch(PageView);