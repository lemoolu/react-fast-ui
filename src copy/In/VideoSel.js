import { Button, Input } from 'antd';
import Upload from '../Upload';
import SwitchShow from '../SwitchShow';
import PageTable from '../PageTable';
import { PureComponent } from 'react';

export default class VideoSel extends PureComponent {
  state = {
  }

  static defaultProps = {
    type: 'all', // upload， sel
    uploadType: 'video',
  }

  onChange = (v) => {
    this.props.onChange && this.props.onChange(v);
  }

  render() {
    const { type } = this.props;

    return (
      <div>
        <div style={{ display: 'flex' }}>
          {(type === 'all' || type === 'upload') && <Upload type={this.props.uploadType} onChange={v => this.onChange(v)}></Upload>}
          {(type === 'all' || type === 'sel') && <SwitchShow node={<Button style={{ margin: '4px 0 0 10px' }}>媒体库</Button>}>
            <PageTable
              title="选择"
              type="modal"
              modalProps={{
                width: 800
              }}
              fetch={{
                api: '/api/media'
              }}
              rowKey="url"
              columns={[
                { title: 'ID', dataIndex: 'id' },
                { title: '标题', dataIndex: 'title' },
                { title: '链接', dataIndex: 'url' },
              ]}
              tableProps={{
                rowSelection: {
                  type: 'radio',
                  onChange: (selects) => {
                    // console.log(selects)
                    this.setState({ sel: selects[0] })
                  }
                },
              }}
              handleOk={() => {
                this.onChange(this.state.sel)
                this.setState({ sel: null })
              }}
              filters={[
                { title: '标题', dataIndex: 'title', decorator: <Input /> },
              ]}
            />
          </SwitchShow>
          }
        </div>
        <div>{this.props.value}</div>
      </div>
    )
  }
}
