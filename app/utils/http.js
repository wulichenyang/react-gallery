/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
// import router from '../router';
import { message } from 'antd';
import { browserHistory } from 'react-router'
import { hashHistory } from 'react-router';
import cookie from '@utils/cookie';

export const GET = 'GET';
export const POST = 'POST';
export const UPDATE = 'UPDATE';
export const PUT = 'PUT';

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  hashHistory.push('/signin')
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      message.warning('未登录，请先登录');
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      message.warning('登录超时');
      cookie.removeCookie('token')
      toLogin();
      break;
    // 404请求不存在
    case 404:
      message.error('请求的资源不存在');
      break;
    // 500服务器内部错误
    case 500:
      message.error('服务器内部错误');
      break;
    default:
      console.log(msg);
  }
}

// 创建axios实例
let instance = axios.create({ timeout: 1000 * 12 })
// 设置CORS头部携带cookie
instance.defaults.withCredentials = true
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/** 
 * 请求拦截器, 在请求发出之前进行一些操作
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
    const token = cookie.getCookie('token');
    token && (config.headers["Authorization"] = `Bearer ${token}`);
    return config;
  },
  error => Promise.error(error))
/** 
 * 响应拦截器, 在这里对返回的数据进行处理
 */
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围 
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  });

/** 
 * join params Obj to '?xx=xx&xx=xx'
 * @param {Object} paramsObj 请求url
 */
export const formatParams = paramsObj => {
  // remove keys point to undefined value
  const keys = Object.keys(paramsObj).filter(key => undefined !== paramsObj[key]);
  if (keys.length) {
    return '?' + keys.map(key => `${key}=${paramsObj[key]}`).join('&')
  } else {
    return ''
  }
};

/** 
 * 封装 axios 的 GET POST PUT UPDATE的api请求路径接口
 * @param {String} url 请求url
 * @param {GET, POST, PUT, UPDATE} 请求方法
 */
export default (url, method = GET) => {
  // data => GET : query { a: '', b: '', ... }
  //      => POST: body { a: '', b: '', ... }
  // append
  /** 
   * 暴露给用户的数据接口
   * @param {Object} data query 或者 body
   * data => GET : query { a: '', b: '', ... }
   * data => POST: body  { a: '', b: '', ... }
   * @param {String sequence} appendToUrl params
   * appendToUrl => '/123', '/${id}', ...rest
   */
  return async (data = {}, ...appendToUrl) => {
    if (method === GET && data) {
      appendToUrl.push(formatParams(data));
    }
    try {
      let res;
      if (method === GET) {
        res = await instance.get(`${url}${appendToUrl.join('')}`)
      } else if (method === POST) {
        res = await instance.post(`${url}${appendToUrl.join('')}`, data)
      } else if (method === PUT) {
        res = await instance.put(`${url}${appendToUrl.join('')}`, data)
      }
      return res;
    } catch (error) {
      throw new Error('Api request error: ' + error)
      return new Promise((r, f) => {
        return f({
          data: {},
          msg: 'Api request error',
          status: 1
        })
      })
    }
  }
}