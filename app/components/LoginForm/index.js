import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './index.less'
import { Link, hashHistory } from 'react-router';
import { userApi } from '@api';
import cookie from '@utils/cookie';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res = await userApi.signin({
          username: values.username.trim(),
          password: values.password,
        })
        if (res.status === 1) { // fail
          message.error(res.msg)
        } else if (res.status === 0) { // success
          message.success(res.msg)
          // expires=0.02 hour
          cookie.setCookie('token', res.data.token, 0.01)
          hashHistory.push('home')
        }
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
        <FormItem style={{ marginBottom: '0' }}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
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