/**
 * finacial模块接口列表
 */
import baseUrl from './baseUrl'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import { GET, POST, PUT, UPDATE } from '@/utils/http'

const finacialApi = {
  // 金融消费单列表    
  async finacialList() {
    try {
      const finacialList = await axios.get(`${baseUrl.dev}/finacial`)
    } catch (error) {
      
    }
    .catch
  },
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