import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './index.less'
import { userApi } from '@api'
import { hashHistory } from 'react-router';
import { Link } from 'react-router'
import pbkdf2 from 'pbkdf2'
import { salt } from '@configs'

const FormItem = Form.Item;

class NormalRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitLoading: false,
    };
  }
  resetButton = () => {
    this.setState({
      submitLoading: false,
    })
  }
  resetForm = () => {
    this.props.form.resetFields([
      'username',
      'password',
      'confirm'
    ])
  }
  handleSignup = async (e) => {
    e.preventDefault();
    this.setState({
      submitLoading: true
    })
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let encoded = pbkdf2.pbkdf2Sync(values.password, salt, 5000, 32, 'sha512').toString('hex')
        let res = await userApi.signup({
          username: values.username,
          password: encoded,
        })
        // fail
        if(res.status === 1) {
          message.error(res.msg)
          this.resetButton()
        } else if(res.status === 0) { // success
          message.success(res.msg)
          this.resetForm()
          this.resetButton()
          hashHistory.push('/signin')
        }
      } else {
        this.resetButton()
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSignup} className="login-form">
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
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Please input your confirm password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm password" />
            )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.submitLoading}
          >
            Sign up
          </Button>
            Or <Link to="/signin">
              Sign in
            </Link>
        </FormItem>
      </Form>
    );
  }
}

const RegisterForm = Form.create()(NormalRegisterForm);

export default RegisterForm