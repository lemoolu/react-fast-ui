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
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};

class PageForm extends PureComponent {
  state = {
    values: {},
    history: []
  }

  static defaultProps = {
    fetch: null, // 参照Fetch组件 提交表单
    fetchDetail: null, // 参照Fetch组件 获取详情
    defaultValue: null, // 表单初始值
    type: 'page', // page | content | modal
    columns: [], // 表单项配置
    handleOk: null, // modal模式 确定的时候调用
    handleClose: null, // modal模式关闭时调用
    checkIsAdd: () => !window.location.href.includes('id='), // 确认是否为编辑编辑表单
    successAddText: "操作成功！",
    successEditText: "操作成功！"
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
    console.log('defaultValue', this.props.defaultValue)
    if (this.props.defaultValue) {
      setTimeout(() => {
        this.setState({ values: this.props.defaultValue });
      })
    }
  }

  onSubmit = (value) => {
    console.log(value)
    this.setState({
      history: [...this.state.history, value]
    });
  }

  onResponse = async (res) => {
    if (this.props.checkIsAdd()) {
      this.props.successAddText && message.success(this.props.successAddText);
    } else {
      this.props.successEditText && message.success(this.props.successEditText);
    }
    if (this.props.linkList) {
      router.push(this.props.linkList);
    }
    console.log(this.props.handleOk)
    await this.props.handleOk && this.props.handleOk();
    this.onClose();
  }

  onResponseDetail = (res) => {
    let values = this.props.fetchDetail.onResponse ? this.props.fetchDetail.onResponse(res) : res;
    this.setState({ values })
  }

  onClose = () => {
    console.log('onclose')
    this.props.handleClose && this.props.handleClose();
  }

  onOk = () => {
    this.submitHandle();
  }
  onCancel = () => {
    if (this.props.linkList) {
      router.push(this.props.linkList);
    }
  }

  render() {
    const columns = _.isArray(this.props.columns) ? this.props.columns.filter(x => !!x) : [];
    // console.log('this.props.fetchDetail', this.props.fetchDetail)
    const form = (
      <div>
        <Fetch
          {...this.props.fetch}
          history={this.state.history}
          onResponse={this.onResponse}
        />
        {/* && !this.props.checkIsAdd() */}
        {this.props.fetchDetail &&
          <Fetch
            {...this.props.fetchDetail}
            onResponse={this.onResponseDetail}
          />
        }
        <ControlledForm
          value={this.state.values}
          itemProps={formLayout}
          onChange={(data, key, value) => {
            this.setState({ values: data });
          }}
          onSubmit={(value) => {
            this.onSubmit(value);
          }}
          handles={({ onSubmit }) => this.submitHandle = onSubmit}
        >
          {columns.map(x => {
            let compile = this.jexlCompiles[x.dataIndex];
            if (compile && !compile.evalSync(this.state.values)) {
              return null;
            }
            return <FormItem
              label={x.title}
              dataIndex={x.dataIndex}
              decorator={x.decorator}
              key={x.title + x.dataIndex}
              rules={x.rules}
              required={x.required === false ? false : true}
            />
          })}
          {this.props.type === 'page' &&
            <FormItem
              wrapperCol={{ span: 12, offset: formLayout.labelCol.span }}
            >
              <Button type="primary" htmlType="submit">确定</Button>&nbsp;
              {this.props.linkList && <Button onClick={this.onCancel}>取消</Button>}
            </FormItem>
          }
        </ControlledForm>
      </div>
    )

    if (this.props.type === 'page') {
      return <Card title={this.props.title} showBack={this.props.showBack}>{form}</Card>
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
          onCancel={this.onClose}
          {...this.props.modalProps}
        >
          {form}
        </Modal>
      )
    }

    return (
      <div>
        {form}
      </div>
    )
  }
}

export default PageForm
