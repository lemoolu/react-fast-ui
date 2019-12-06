import React, { PureComponent } from 'react';
import { Button, Row, Col, Icon, Modal } from 'antd';
import ControlledForm from './ControlledForm';
import Card from './Card';
import TableEx from './TableEx';
import router from 'umi/router';
import _ from 'lodash';

const FormItem = ControlledForm.Item;

class PageTable extends PureComponent {
  state = {
    history: [],
    filterData: {},
  }

  static defaultProps = {
    type: 'page', // page | content | modal
    fetch: {}, // 请求相关的，参数参照Fetch组件
    columns: [], // 列配置
    linkAdd: null, // 新增页面
    rowKey: 'id',
    filters: [], // 筛选项 [{title, decorator, if: 'jexl表达式}]
    handles: (refresh) => { },
    handleClose: null, // modal模式下触发关闭
    handleOk: null, // modal模式下确定按钮事件，内部会触发handleClose
    tableProps: {}, // 表格额外参数
    modalProps: {}, // 弹窗额外参数
  }

  componentDidMount() {
    if (this.props.handles) {
      this.props.handles(this.getData);
    }
    this.getData();
  }

  getData = (data) => {
    this.setState({
      history: [...this.state.history, { ...this.state.filterData, ...data }]
    });
  }

  onSearch = () => {
    this.getData();
  }

  onClear = () => {
    this.setState({ filterData: {} }, () => {
      this.getData();
    });
  }

  onLink = (path) => {
    router.push(path);
  }

  onOk = async () => {
    if (this.props.handleOk) {
      await this.props.handleOk();
    }
    this.props.handleClose && this.props.handleClose();
  }

  onPaginationChange = (current, size) => {
    this.getData({
      page: current,
      page_rows: size
    });
  }

  render() {
    const filters = _.isArray(this.props.filters) ? this.props.filters.filter(x => !!x) : [];
    const columns = _.isArray(this.props.columns) ? this.props.columns.filter(x => !!x) : [];
    const length = _.sum(filters.map(x => x.span || 6));
    const btnSpan = 24 - (length % 24);
    const content = (
      <div>
        {filters.length > 0 &&
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <ControlledForm
              value={this.state.filterData}
              onChange={(data, key, value) => {
                this.setState({ filterData: data });
              }}
              className="form-inline"
            >
              {filters.map(x =>
                <Col span={x.span || 6} key={x.dataIndex}>
                  <FormItem
                    label={x.title}
                    dataIndex={x.dataIndex}
                    decorator={x.decorator}
                  />
                </Col>
              )}
              <Col span={btnSpan > 2 ? btnSpan : 24} style={{ textAlign: 'right', paddingTop: 4 }}>
                <Button onClick={this.onClear} style={{ marginRight: 8 }}>
                  <Icon type="close"></Icon>重置
                </Button>
                <Button onClick={this.onSearch} type="primary">
                  <Icon type="search"></Icon>查询
                </Button>
              </Col>
            </ControlledForm>
          </Row>
        }
        <TableEx
          fetch={{
            ...this.props.fetch,
            history: this.state.history
          }}
          onPaginationChange={this.onPaginationChange}
          columns={columns}
          rowKey={this.props.rowKey}
          {...this.props.tableProps}
        />
      </div>
    );

    if (this.props.type === 'page') {
      return (
        <Card
          title={this.props.title}
          extra={
            <React.Fragment>
              {this.props.linkAdd &&
                <Button type="primary" onClick={() => this.onLink(this.props.linkAdd)}>
                  <Icon type="plus"></Icon>添加
                </Button>
              }
              {this.props.tools}
            </React.Fragment>
          }
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
          visible={true}
          // zIndex={9999999}
          okText="确定"
          cancelText="取消"
          onOk={this.onOk}
          onCancel={() => this.props.handleClose && this.props.handleClose()}
          {...this.props.modalProps}
        >
          {content}
        </Modal>
      );
    }
    return 'Page Table: 无效type'
  }
}


export default PageTable;
