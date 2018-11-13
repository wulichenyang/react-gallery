import React, { Component, Fragment } from 'react';
import FinacialRecord from '@components/FinacialRecord'
import { MainWrapper } from '@components/MainWrapper';
// Using ant design
import { Table, Input, InputNumber, Popconfirm, Form, Button as Btn, Modal, 
         Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';
import './index.less'
import { Button } from '@components/Buttons';

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    activity: `Shopping ${i}`,
    money: 2000,
    date: new Date().toISOString().slice(0, 10),
  });
}

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class FinacialTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data, 
      editingKey: '', 
      removingKey: '',
      addVisible: false,
    };
    this.columns = [
      {
        title: 'Activity',
        dataIndex: 'activity',
        width: '40%',
        editable: true,
      },
      {
        title: 'Money',
        dataIndex: 'money',
        width: '15%',
        editable: true,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        width: '25%',
        editable: true,
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          const showRemove = this.isRemoving(record);

          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <Btn
                        type="primary"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </Btn>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <Btn>Cancel</Btn>
                  </Popconfirm>
                </span>
              ) : (
                <Fragment>
                  <Btn 
                    onClick={() => this.showRemoveModal(record.key)}
                    type="danger"
                  >
                    Delete
                  </Btn>
                  <Btn onClick={() => this.edit(record.key)}>Edit</Btn>
                </Fragment>
              )}
            </div>
          );
        },
      },
    ];
  }

  // Remove modal
  showRemoveModal = (key) => {
    this.setState({
      removingKey: key,
      removeVisible: true,
    });
  }

  handleRemoveOk = () => {
    this.setState(prevState => {
      const removingKey = prevState.removingKey
      return {
        data: prevState.data.filter(record => {
          return record.key !== removingKey
        }),
        removingKey: '',
        removeVisible: false,
      }
    })
  }

  handleRemoveCancel = () => {
    console.log();
    this.setState({
      removingKey: '',
      removeVisible: false,
    });
    
  }

  // Add modal
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  }

  handleAddOk = () => {
    this.setState(prevState => ({
      addVisible: false,
    }));
  }

  handleAddCancel = () => {
    this.setState({
      addVisible: false,
    });
  }

  // bool
  isEditing = (record) => {
    return record.key === this.state.editingKey;
  }

  isRemoving = (record) => {
    return record.key === this.state.removingKey;
  }

  add() {

  }

  remove(key) {
    this.setState({ removingKey: key })
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };
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
    // Add form
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
    // Table
    const addVisible = this.state.addVisible;
    const removeVisible = this.state.removeVisible;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'money' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Fragment>
        <div className="add-btn-wrapper">
          <Btn
            onClick={() => this.showAddModal()}
            type="primary"
          >
            Add
          </Btn>
        </div>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
        />
        {/* Add modal  */}
        <Modal
          title="Add"
          visible={addVisible}
          onOk={() => this.handleAddOk()}
          onCancel={() => this.handleAddCancel()}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="activity"
            >
              {getFieldDecorator('activity', {
                rules: [{
                  type: 'activity', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your activity!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="money"
            >
              {getFieldDecorator('money', {
                rules: [{
                  type: 'money', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your money!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Date"
            >
              {getFieldDecorator('date-picker', config)(
                <DatePicker />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="DatePicker[showTime]"
            >
              {getFieldDecorator('date-time-picker', config)(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
          </Form>
        </Modal>

        {/* Delete modal  */}
        <Modal
          title="Confirm delete"
          visible={removeVisible}
          onOk={() => this.handleRemoveOk()}
          onCancel={() => this.handleRemoveCancel()}
        >
          <p>Sure to Delete?</p>
        </Modal>
      </Fragment>
    );
  }
}


export default FinacialTable