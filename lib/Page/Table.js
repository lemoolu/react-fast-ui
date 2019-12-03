function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { Button, Row, Col, Icon, Modal } from 'antd';
import ControlledForm from './ControlledForm';
import Card from './Card';
import TableEx from './TableEx';
import router from 'umi/router';
import _ from 'lodash';
const FormItem = ControlledForm.Item;

class PageTable extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      history: [],
      filterData: {}
    });

    _defineProperty(this, "getData", data => {
      this.setState({
        history: [...this.state.history, { ...this.state.filterData,
          ...data
        }]
      });
    });

    _defineProperty(this, "onSearch", () => {
      this.getData();
    });

    _defineProperty(this, "onClear", () => {
      this.setState({
        filterData: {}
      }, () => {
        this.getData();
      });
    });

    _defineProperty(this, "onLink", path => {
      router.push(path);
    });

    _defineProperty(this, "onOk", async () => {
      if (this.props.handleOk) {
        await this.props.handleOk();
      }

      this.props.handleClose && this.props.handleClose();
    });

    _defineProperty(this, "onPaginationChange", (current, size) => {
      this.getData({
        page: current,
        page_rows: size
      });
    });
  }

  componentDidMount() {
    if (this.props.handles) {
      this.props.handles(this.getData);
    }

    this.getData();
  }

  render() {
    const filters = _.isArray(this.props.filters) ? this.props.filters.filter(x => !!x) : [];
    const columns = _.isArray(this.props.columns) ? this.props.columns.filter(x => !!x) : [];

    const length = _.sum(filters.map(x => x.span || 6));

    const btnSpan = 24 - length % 24;
    const content = React.createElement("div", null, filters.length > 0 && React.createElement(Row, {
      gutter: 16,
      style: {
        marginBottom: 16
      }
    }, React.createElement(ControlledForm, {
      value: this.state.filterData,
      onChange: (data, key, value) => {
        this.setState({
          filterData: data
        });
      },
      className: "form-inline"
    }, filters.map(x => React.createElement(Col, {
      span: x.span || 6,
      key: x.dataIndex
    }, React.createElement(FormItem, {
      label: x.title,
      dataIndex: x.dataIndex,
      decorator: x.decorator
    }))), React.createElement(Col, {
      span: btnSpan > 2 ? btnSpan : 24,
      style: {
        textAlign: 'right',
        paddingTop: 4
      }
    }, React.createElement(Button, {
      onClick: this.onClear,
      style: {
        marginRight: 8
      }
    }, React.createElement(Icon, {
      type: "close"
    }), "\u91CD\u7F6E"), React.createElement(Button, {
      onClick: this.onSearch,
      type: "primary"
    }, React.createElement(Icon, {
      type: "search"
    }), "\u67E5\u8BE2")))), React.createElement(TableEx, _extends({
      fetch: { ...this.props.fetch,
        history: this.state.history
      },
      onPaginationChange: this.onPaginationChange,
      columns: columns,
      rowKey: this.props.rowKey
    }, this.props.tableProps)));

    if (this.props.type === 'page') {
      return React.createElement(Card, {
        title: this.props.title,
        extra: React.createElement(React.Fragment, null, this.props.linkAdd && React.createElement(Button, {
          type: "primary",
          onClick: () => this.onLink(this.props.linkAdd)
        }, React.createElement(Icon, {
          type: "plus"
        }), "\u6DFB\u52A0"), this.props.tools)
      }, content);
    }

    if (this.props.type === 'content') {
      return content;
    }

    if (this.props.type === 'modal') {
      return React.createElement(Modal, _extends({
        title: this.props.title,
        visible: true // zIndex={9999999}
        ,
        okText: "\u786E\u5B9A",
        cancelText: "\u53D6\u6D88",
        onOk: this.onOk,
        onCancel: () => this.props.handleClose && this.props.handleClose()
      }, this.props.modalProps), content);
    }

    return 'Page Table: 无效type';
  }

}

_defineProperty(PageTable, "defaultProps", {
  type: 'page',
  // page | content | modal
  fetch: {},
  // 请求相关的，参数参照Fetch组件
  columns: [],
  // 列配置
  linkAdd: null,
  // 新增页面
  rowKey: 'id',
  filters: [],
  // 筛选项 [{title, decorator, if: 'jexl表达式}]
  handles: refresh => {},
  handleClose: null,
  // modal模式下触发关闭
  handleOk: null,
  // modal模式下确定按钮事件，内部会触发handleClose
  tableProps: {},
  // 表格额外参数
  modalProps: {} // 弹窗额外参数

});

export default PageTable;