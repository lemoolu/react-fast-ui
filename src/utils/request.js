import axios from 'axios';
import _ from 'lodash';
import { message } from 'antd';
import router from 'umi/router';

const domain = ''; // http://47.98.255.159:8090
/**
 * 方式1：request('apiname', params).then(res => {})
 * 方式2：request({ url, method }, params).then(res => {})
 * @param {*} apiname
 * @param {*} params
 */
const defaultConfig = {
  checkLogin: true,
  checkSuccess: true,
  showError: true
}
export function request(_api = '', params, config) {
  const api = _.isObject(_api) ? _api : { url: _api, method: 'get' };
  config = Object.assign({}, defaultConfig, config);
  if (!api) {
    console.error('！！request: apiname');
    return;
  }

  return new Promise((resolve, reject) => {
    const method = _.upperCase(api.method || 'get');
    axios({
      ...api,
      url: domain + api.url,
      [['GET'].includes(method) ? 'params' : 'data']: params,
      withCredentials: true
    }).then(res => {
      return res.data;
    }).then(res => {
      if (config.checkLogin && res.code === 401) {
        router.push('/login')
        return;
      }
      if (config.checkSuccess && !res.type) {
        config.showError && message.warn(res.detail);
        reject(res);
      }
      resolve(res);
    }).catch(e => {
      reject(e);
      config.showError && message.error('请求出错');
    })
  });
}
/**
 * 请求包装器 coo('userList', params, 'list')(params).then(res => {})
 * @param {*} apiname
 * @param {*} params
 */
export function coo(api, params, cb) {
  return newParams => {
    const p = Object.assign({}, params, newParams);
    return request(api, p).then(res => cb ? cb(res) : res);
  };
}
