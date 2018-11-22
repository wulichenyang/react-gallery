
import React, {Component} from 'react'

import { Form, DatePicker, TimePicker, Button, Input, InputNumber } from 'antd';
import { AddTodo } from '@containers/Todo/AddTodo';

class AddForm extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // Bind 'this' to parent's 'this.child'
    this.props.onRef(this)
  }

  handleMoneyInput = (rule, value, callback) => {
    if (value < 0) {
      callback('Money must be more than 0！')
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }

  render() {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { submitLoading, handleSubmit} = this.props

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
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
        }, {
          validator: this.handleMoneyInput
        }],
      },
      date: {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      }
    }

    return (
      <Form onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Activity"
        >
          {getFieldDecorator('activity', config.activity)(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Money"
        >
          {getFieldDecorator('money', config.money)(
            <InputNumber />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Date"
        >
          {getFieldDecorator('date', config.date)(
            <DatePicker />
          )}
        </FormItem>
        <FormItem 
          {...tailFormItemLayout}
          style={{textAlign: 'right'}}
        >
          <Button
            type="default"
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitLoading}
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(AddForm)

export default WrappedAddForm