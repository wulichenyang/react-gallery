/** 
 * api接口的统一出口
 */

// finacial模块接口
import * as finacialApi from '@api/apis/finacial';
// user模块接口
import * as userApi from '@api/apis/user';
// 其他模块的接口……

// 导出接口
export {
  finacialApi,
  userApi,
  // ……
}