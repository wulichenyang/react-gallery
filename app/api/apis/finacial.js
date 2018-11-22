/**
 * finacial模块接口列表
 */
import baseUrl from '@api/baseUrl'; // 导入接口域名列表
import api from '@utils/http' // 导入http中的请求函数
import { GET, POST, PUT, UPDATE } from '@utils/http'

export const getFinacialList = api(`${baseUrl.dev}/getAllFinacial`)
export const addFinacialList = api(`${baseUrl.dev}/addFinacial`, POST)
export const delFinacialList = api(`${baseUrl.dev}/delFinacial`, POST)
export const updateFinacialList = api(`${baseUrl.dev}/updateFinacial`, PUT)