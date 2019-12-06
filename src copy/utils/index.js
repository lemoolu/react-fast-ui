import _ from 'lodash';
import qs from 'qs';
export { request, coo } from './request';
export { default as api } from './api';
export { default as view } from './view';
export { default as parser } from './parser';

/**
 * pathMatchQuery('/user/detial?id=:id&name=:name2&sd=12', { id: 100, name2: { a: 1 } }) => /user/detial?id=100&name={a:1}&sd=12
 * @param {*} url
 * @param {*} context
 */
export function pathMatchQuery(url = '', query) {
  query = query || getQuery();
  return url.replace(/:([a-zA-Z0-9\.]+)/g, word => {
    let value = _.get(query, word.replace(':', ''));
    value = parseInt(value) || value;
    return JSON.stringify(value);
  });
}

export function getQuery() {
  let str = window.location.hash.split('?')[1] || '';
  return qs.parse(str);
}

export function warpResult(options) {
  return function (v) {
    if (_.isObject(options)) {
      return options[v] || v;
    }
    if (_.isArray(options)) {
      const item = options.find(x => x.value === v);
      return item ? item.label : v;
    }
    return v;
  }
}

export const config = {};
