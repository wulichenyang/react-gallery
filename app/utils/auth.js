// 登录验证 路由改变时刷新cookie中的token过期时间 0.2小时
import cookie from '@utils/cookie'
import { message } from 'antd'

export const requireAuth = (nextState, replace) => {
  let token = cookie.getCookie('token')
  let username = cookie.getCookie('username')
  if (!token) { // 未登录
    message.info('请登录')
    replace({
      pathname: '/signin',
      // state: { nextPathname: nextState.location.pathname }
    });
  } else { // 刷新token在cookie里的时间
    cookie.setCookie('token', token, 0.2)
    cookie.setCookie('username', username, 0.2)
  }
}