import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './index.less'
import { Link, hashHistory } from 'react-router';
import { userApi } from '@api';
import cookie from '@utils/cookie';
import { salt } from '@configs'
import pbkdf2 from 'pbkdf2'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { setUserInfo } from '@actions/user'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.captchaRef = React.createRef();
    this.state = {
      captchaSvg: null,
      submitLoading: false,
    }
  }
  componentDidMount() {
    this.refreshCaptcha()
  }

  // // 组件更新props
  // componentWillReceiveProps(nextProps) {
  //   // this.setState({
  //   //   captchaSvg:  ? nextProps.goods_desc : '',
  //   // });
  //   console.log(nextProps)
  // }
  // 更新完毕
  componentDidUpdate() {
    this.captchaRef.current.innerHTML = this.state.captchaSvg;
  }

  refreshCaptcha = async () => {
    let res = await userApi.captcha()
    if (res.status === 0) {
      this.setState({
        captchaSvg: res.data.img
      })
    }
    this.props.form.resetFields(['captcha'])
  }

  handleCaptchaClick = async (e) => {
    e.preventDefault()
    await this.refreshCaptcha()
  }

  loadingButton = () => {
    this.setState({
      submitLoading: true
    })
  }

  resetButton = () => {
    this.setState({
      submitLoading: false,
    })
  }

  resetForm = () => {
    this.props.form.resetFields(['username', 'password'])
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.loadingButton()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let username = values.username.trim()
        let encoded = pbkdf2.pbkdf2Sync(values.password, salt, 5000, 32, 'sha512').toString('hex')
        let res = await userApi.signin({
          username,
          password: encoded,
          captcha: values.captcha.trim().toLowerCase(),
        })
        if (res.status === 1) { // fail
          message.error(res.msg)
          this.resetButton()
          await this.refreshCaptcha()
        } else if (res.status === 0) { // success
          message.success(res.msg)
          cookie.setCookie('token', res.data.token, 0.2)
          cookie.setCookie('username', username)
          this.resetForm()
          this.resetButton()
          await this.refreshCaptcha()
          // expires=0.2 hour
          hashHistory.push('/home')
        }
      } else {
        this.resetButton()
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <FormItem
          style={{ marginBottom: '0' }}
        >
          <div className="captcha-wrapper">
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input captcha!' }],
            })(
              <Input placeholder="Captcha" />
              )}
            <div
              className="captcha-svg-wrapper"
              ref={this.captchaRef}
              onClick={this.handleCaptchaClick}
            >
            </div>
          </div>
        </FormItem>
        <FormItem style={{ marginBottom: '0', textAlign: 'right' }}>
          <a className="login-form-forgot" href="">Forgot password</a>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/signup">
            register now!
             </Link>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//   //   // dispatching plain actions
//   ...bindActionCreators({ setUserInfo }, dispatch)
//   }
//   // return {
//   //   setUserInfo : (username) => dispatch(setUserInfo(username)),
//   // }
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(LoginForm)