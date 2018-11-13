
import React, {Component} from 'react'

import { Form, DatePicker, TimePicker, Button, Input, InputNumber } from 'antd';

class AddForm extends Component {
  constructor(props) {
    super(props)
  }
  // Add from
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    // Date-picker rules
    const config = {
      activity: {
        rules: [{
          required: true, message: 'Please input your activity!',
        }],
      },
      money: {
        rules: [{
          type: 'number', message: 'The input is not valid number!',
        }, {
          required: true, message: 'Please input your money!',
        }],
      },
      date: {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="activity"
        >
          {getFieldDecorator('activity', config.activity)(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="money"
        >
          {getFieldDecorator('money', config.money)(
            <InputNumber />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Date"
        >
          {getFieldDecorator('date-picker', config.date)(
            <DatePicker />
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(AddForm)

export default WrappedAddForm