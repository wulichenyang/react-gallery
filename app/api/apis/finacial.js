/**
 * finacial模块接口列表
 */
import baseUrl from '@api/baseUrl'; // 导入接口域名列表
import api from '@utils/http'; // 导入http中的请求函数
import { GET, POST, PUT, UPDATE } from '@utils/http'

const finacialApi = {
  // 金融消费单列表    
  getFinacialList() {
    return api(`${baseUrl.dev}/finacial`)
  }
  // 消费单详情,演示    
  // finacialDetail(id, params) {
  //   return axios.get(`${baseUrl.dev}/topic/${id}`, {
  //     params: params
  //   });
  // },
  // // post提交    
  // login(params) {
  //   return axios.post(`${baseUrl.dev}/accesstoken`, qs.stringify(params));
  // }
  // 其他接口…………
}

export default finacialApi;