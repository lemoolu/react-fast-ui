import React, { PureComponent } from 'react';
import { Upload, Button, Icon } from 'antd';
import _ from 'lodash';
import { request } from '@/utils';
import { Base64 } from 'js-base64';
import './lib/crypto1/crypto/crypto.js';
import './lib/crypto1/hmac/hmac.js';
import './lib/crypto1/sha1/sha1.js';

// OSSData = {
//   accessKeyId: _.get(res, 'data.access_key_id'),
//   accessKeySecrety: _.get(res, 'data.access_key_secrety'),
//   host: _.get(res, 'data.host'),
//   dir: {
//     ad: _.get(res, 'data.upload_dir.ad'),
//     feedback: _.get(res, 'data.upload_dir.feedback'),
//     media: _.get(res, 'data.upload_dir.media'),
//     userAvatar: _.get(res, 'data.upload_dir.user_avatar'),
//     video: _.get(res, 'data.upload_dir.video'),
//     videoCover: _.get(res, 'data.upload_dir.video_cover'),
//   }
// }
let OSSData;

function getAuth() {
  return new Promise((resolve, reject) => {
    if (OSSData) {
      resolve(OSSData);
      return;
    }
    request('/api/media/auth').then(res => {
      OSSData = res.data;
      const policyText = {
        "expiration": "2030-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        "conditions": [
          ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
        ]
      };
      const policyBase64 = Base64.encode(JSON.stringify(policyText))
      const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, OSSData.access_key_secrety, { asBytes: true });
      const signature = Crypto.util.bytesToBase64(bytes);
      OSSData.signature = signature;
      OSSData.policy = policyBase64;
      resolve(OSSData)
    }).catch(e => {
      reject(e)
    });
  });
}

export default class UploadEx extends PureComponent {
  state = {
    fileList: [],
    OSSData: OSSData,
  }
  static defaultProps = {
    type: 'media', // media，feedback用户反馈，video视频，userAvatar用户头像，videoCover视频封面，ad广告
    multipleMax: 1, // 上传数量
  }
  componentDidMount() {
    if (!this.state.OSSData) {
      getAuth().then(res => {
        this.setState({ OSSData: res })
      });
    }
    this.setUploaded(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.setUploaded(this.props.value);
    });
  }

  setUploaded = (_u) => {
    if (!_u) {
      return;
    }
    let urls = _.isArray(_u) ? _u : [_u];
    const _urls = this.state.fileList.map(x => x.urlWithDomain);
    if (!_.isEqual(urls, _urls)) {
      const fileList = urls.map(x => ({
        uid: x,
        name: x,
        status: 'done',
        url: x,
      }));
      console.log(fileList);
      this.setState({ fileList })
    }
  }

  getDir = () => {
    const key = {
      ad: _.get(this.state.OSSData, 'upload_dir.ad'),
      feedback: _.get(this.state.OSSData, 'upload_dir.feedback'),
      media: _.get(this.state.OSSData, 'upload_dir.media'),
      userAvatar: _.get(this.state.OSSData, 'upload_dir.user_avatar'),
      video: _.get(this.state.OSSData, 'upload_dir.video'),
      videoCover: _.get(this.state.OSSData, 'upload_dir.video_cover'),
    }
    return key[this.props.type];
  }

  onChange = (data) => {
    let fileList = [...data.fileList];
    this.setState({ fileList });
    if (fileList.length === 0 || fileList.filter(x => x.status === 'done').length === fileList.length) {
      const urls = fileList.map(x => x.urlWithDomain);
      console.log(urls);
      if (this.props.multipleMax > 1) {
        this.props.onChange && this.props.onChange(urls);
      } else {
        this.props.onChange && this.props.onChange(urls[0]);
      }
    }
  }
  getExtraData = file => {
    const { OSSData } = this.state;
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = this.getDir() + filename;
    file.urlWithDomain = _.get(OSSData, 'host') + file.url;
    return {
      name: file.name,
      key: file.url,
      OSSAccessKeyId: _.get(OSSData, 'access_key_id'),
      policy: _.get(OSSData, 'policy'),
      signature: _.get(OSSData, 'signature'),
      success_action_status: 200
    };
  };

  render() {
    const { type, multipleMax } = this.props
    const isVideo = ['video'].includes(type);
    return (
      <Upload
        onChange={this.onChange}
        action={_.get(OSSData, 'host')}
        listType={isVideo ? 'text' : 'picture-card'}
        fileList={this.state.fileList}
        data={this.getExtraData}
      >
        {this.state.fileList.length < multipleMax &&
          <React.Fragment>
            {isVideo ?
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
              :
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
              </div>
            }
          </React.Fragment>
        }
      </Upload>
    )
  }
}
