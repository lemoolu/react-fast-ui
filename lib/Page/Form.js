function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import ControlledForm from './ControlledForm';
import { Button, message, Modal } from 'antd';
import router from 'umi/router';
import _ from 'lodash';
import Fetch from './Fetch';
import Card from './Card';
import jexl from 'jexl';
const FormItem = ControlledForm.Item;
const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};

class PageForm extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      values: {},
      history: []
    });

    _defineProperty(this, "onSubmit", value => {
      console.log(value);
      this.setState({
        history: [...this.state.history, value]
      });
    });

    _defineProperty(this, "onResponse", async res => {
      if (this.props.checkIsAdd()) {
        this.props.successAddText && message.success(this.props.successAddText);
      } else {
        this.props.successEditText && message.success(this.props.successEditText);
      }

      if (this.props.linkList) {
        router.push(this.props.linkList);
      }

      console.log(this.props.handleOk);
      (await this.props.handleOk) && this.props.handleOk();
      this.onClose();
    });

    _defineProperty(this, "onResponseDetail", res => {
      let values = this.props.fetchDetail.onResponse ? this.props.fetchDetail.onResponse(res) : res;
      this.setState({
        values
      });
    });

    _defineProperty(this, "onClose", () => {
      console.log('onclose');
      this.props.handleClose && this.props.handleClose();
    });

    _defineProperty(this, "onOk", () => {
      this.submitHandle();
    });

    _defineProperty(this, "onCancel", () => {
      if (this.props.linkList) {
        router.push(this.props.linkList);
      }
    });
  }

  componentWillMount() {
    // 生成jexl，必须在组件创建的时候配置！！
    this.jexlCompiles = {};
    this.props.columns.forEach(x => {
      if (x && x.if) {
        this.jexlCompiles[x.dataIndex] = jexl.compile(x.if);
      }
    });
  }

  componentDidMount() {
    console.log('defaultValue', this.props.defaultValue);

    if (this.props.defaultValue) {
      setTimeout(() => {
        this.setState({
          values: this.props.defaultValue
        });
      });
    }
  }

  render() {
    const columns = _.isArray(this.props.columns) ? this.props.columns.filter(x => !!x) : []; // console.log('this.props.fetchDetail', this.props.fetchDetail)

    const form = React.createElement("div", null, React.createElement(Fetch, _extends({}, this.props.fetch, {
      history: this.state.history,
      onResponse: this.onResponse
    })), this.props.fetchDetail && React.createElement(Fetch, _extends({}, this.props.fetchDetail, {
      onResponse: this.onResponseDetail
    })), React.createElement(ControlledForm, {
      value: this.state.values,
      itemProps: formLayout,
      onChange: (data, key, value) => {
        this.setState({
          values: data
        });
      },
      onSubmit: value => {
        this.onSubmit(value);
      },
      handles: ({
        onSubmit
      }) => this.submitHandle = onSubmit
    }, columns.map(x => {
      let compile = this.jexlCompiles[x.dataIndex];

      if (compile && !compile.evalSync(this.state.values)) {
        return null;
      }

      return React.createElement(FormItem, {
        label: x.title,
        dataIndex: x.dataIndex,
        decorator: x.decorator,
        key: x.title + x.dataIndex,
        rules: x.rules,
        required: x.required === false ? false : true
      });
    }), this.props.type === 'page' && React.createElement(FormItem, {
      wrapperCol: {
        span: 12,
        offset: formLayout.labelCol.span
      }
    }, React.createElement(Button, {
      type: "primary",
      htmlType: "submit"
    }, "\u786E\u5B9A"), "\xA0", this.props.linkList && React.createElement(Button, {
      onClick: this.onCancel
    }, "\u53D6\u6D88"))));

    if (this.props.type === 'page') {
      return React.createElement(Card, {
        title: this.props.title,
        showBack: this.props.showBack
      }, form);
    }

    if (this.props.type === 'modal') {
      return React.createElement(Modal, _extends({
        title: this.props.title,
        visible: true // zIndex={9999999}
        ,
        okText: "\u786E\u5B9A",
        cancelText: "\u53D6\u6D88",
        onOk: this.onOk,
        onCancel: this.onClose
      }, this.props.modalProps), form);
    }

    return React.createElement("div", null, form);
  }

}

_defineProperty(PageForm, "defaultProps", {
  fetch: null,
  // 参照Fetch组件 提交表单
  fetchDetail: null,
  // 参照Fetch组件 获取详情
  defaultValue: null,
  // 表单初始值
  type: 'page',
  // page | content | modal
  columns: [],
  // 表单项配置
  handleOk: null,
  // modal模式 确定的时候调用
  handleClose: null,
  // modal模式关闭时调用
  checkIsAdd: () => !window.location.href.includes('id='),
  // 确认是否为编辑编辑表单
  successAddText: "操作成功！",
  successEditText: "操作成功！"
});

export default PageForm;