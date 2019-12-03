function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Button, Input } from 'antd';
import Upload from '../Upload';
import SwitchShow from '../SwitchShow';
import PageTable from '../PageTable';
import { PureComponent } from 'react';
export default class VideoSel extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "onChange", v => {
      this.props.onChange && this.props.onChange(v);
    });
  }

  render() {
    const {
      type
    } = this.props;
    return React.createElement("div", null, React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, (type === 'all' || type === 'upload') && React.createElement(Upload, {
      type: this.props.uploadType,
      onChange: v => this.onChange(v)
    }), (type === 'all' || type === 'sel') && React.createElement(SwitchShow, {
      node: React.createElement(Button, {
        style: {
          margin: '4px 0 0 10px'
        }
      }, "\u5A92\u4F53\u5E93")
    }, React.createElement(PageTable, {
      title: "\u9009\u62E9",
      type: "modal",
      modalProps: {
        width: 800
      },
      fetch: {
        api: '/api/media'
      },
      rowKey: "url",
      columns: [{
        title: 'ID',
        dataIndex: 'id'
      }, {
        title: '标题',
        dataIndex: 'title'
      }, {
        title: '链接',
        dataIndex: 'url'
      }],
      tableProps: {
        rowSelection: {
          type: 'radio',
          onChange: selects => {
            // console.log(selects)
            this.setState({
              sel: selects[0]
            });
          }
        }
      },
      handleOk: () => {
        this.onChange(this.state.sel);
        this.setState({
          sel: null
        });
      },
      filters: [{
        title: '标题',
        dataIndex: 'title',
        decorator: React.createElement(Input, null)
      }]
    }))), React.createElement("div", null, this.props.value));
  }

}

_defineProperty(VideoSel, "defaultProps", {
  type: 'all',
  // upload， sel
  uploadType: 'video'
});