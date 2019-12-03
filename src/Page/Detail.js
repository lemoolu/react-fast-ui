import React, { PureComponent } from 'react';
import { Button, Descriptions, Modal } from 'antd';
import Card from './Card';
import { withFetch } from './Fetch';
import _ from 'lodash';


class PageView extends PureComponent {
  static defaultProps = {
    type: 'page', // page | content | modal
    handleClose: null, // modal模式关闭时调用
  }

  onClose = () => {
    console.log('onclose')
    this.props.handleClose && this.props.handleClose();
  }

  render() {
    let { dataSource } = this.props;
    let content;
    if (_.get(this.props.columns, '[0].children')) {
      content = (
        <div>
          {this.props.columns.map(info =>
            <Descriptions title={info.title} key={info.title}>
              {_.get(info, 'children', []).map(x =>
                <Descriptions.Item label={x.title} key={x.title + x.dataIndex} span={x.span || 1}>
                  {x.render ? x.render(_.get(dataSource, x.dataIndex), dataSource || {}) : _.get(dataSource, x.dataIndex)}
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </div>
      )
    } else {
      content = (
        <Descriptions>
          {this.props.columns.map((x) =>
            <Descriptions.Item label={x.title} key={x.title + x.dataIndex} span={x.span || 1}>
              {x.render ? x.render(_.get(dataSource, x.dataIndex), dataSource || {}) : _.get(dataSource, x.dataIndex)}
            </Descriptions.Item>
          )}
        </Descriptions>
      );
    }

    if (this.props.type === 'page') {
      return (
        <Card
          title={this.props.title}
        >
          {content}
        </Card>
      )
    }
    if (this.props.type === 'content') {
      return content;
    }
    if (this.props.type === 'modal') {
      return (
        <Modal
          title={this.props.title}
          footer={<Button onClick={() => this.props.handleClose && this.props.handleClose()} type="primary">确定</Button>}
          visible={true}
          // zIndex={9999999}
          onCancel={this.onClose}
          {...this.props.modalProps}
        >
          {content}
        </Modal>
      );
    }
    return 'Page View: 无效type'
  }
}

export default withFetch(PageView)
