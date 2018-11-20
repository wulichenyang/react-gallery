import React, { Component, Fragment } from 'react';
import FinacialRecord from '@components/FinacialRecord'
import WrappedAddForm from './WrappedAddForm'
import { MainWrapper } from '@components/MainWrapper';
import moment from 'moment'

// Using ant design
import {
  Table, Input, InputNumber, Popconfirm, Form, Button as Btn, Modal,
  Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, DatePicker, AutoComplete
} from 'antd';
import { Button } from '@components/Buttons';
import { finacialApi } from '@api'
import './index.less'

// const data = [];
// for (let i = 0; i < 10; i++) {
//   data.push({
//     key: i,
//     activity: `Shopping ${i}`,
//     money: 2000,
//     date: new Date().toISOString().slice(0, 10),
//   });
// }

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
    } else if (this.props.inputType === 'date-picker') {
      return <DatePicker />;
    } else {
      return <Input />;
    }
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
                  {
                    getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: dataIndex === 'date' ?
                        moment(record[dataIndex], 'YYYY-MM-DD')
                        : record[dataIndex],
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
      data: [],
      editingKey: null,
      removingKey: null,
      addVisible: false,
      submitLoading: false,
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
                        onClick={(e) => this.save(form, record.key)}
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
                    <Btn onClick={() => this.edit(record.key)}>Edit</Btn>
                    <Btn
                      onClick={() => this.showRemoveModal(record.key)}
                      type="danger"
                    >
                      Delete
                  </Btn>
                  </Fragment>
                )}
            </div>
          );
        },
      },
    ];
  }

  async getFinacialList() {
    let res = await finacialApi.getFinacialList()
    console.log(res.data)
    
    this.setState({
      data: res.data.map(row => ({
        key: row._id,
        activity: row.activity,
        money: row.money,
        date: row.date.slice(0, 10),
      }))
    })
  }
  componentDidMount() {
    this.getFinacialList()
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
        removingKey: null,
        removeVisible: false,
      }
    })
  }

  handleRemoveCancel = () => {
    console.log();
    this.setState({
      removingKey: null,
      removeVisible: false,
    });

  }

  // bool
  isEditing = (record) => {
    return record.key === this.state.editingKey;
  }

  isRemoving = (record) => {
    return record.key === this.state.removingKey;
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
          // Rewrite date into YYYY-MM-DD
          date: row.date.format('YYYY-MM-DD')
        });
        this.setState({ data: newData, editingKey: null });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: null });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: null });
  }

  // Add modal
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  }

  handleAddCancel = () => {
    this.setState({
      addVisible: false,
    });
  }

  cancelAdd = () => {
    this.setState({
      addVisible: false
    })
  }

  // Bind addForm's 'this' to 'this.child'
  onAddFormRef = ref => {
    this.addForm = ref
  }

  handleResetAdd = () => {
    this.addForm.props.form.resetFields();
  }

  handleAddForm = (e) => {
    this.setState({
      submitLoading: true
    })
    e.preventDefault();
    this.addForm.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setTimeout(() => {
          console.log('Received values of form: ', values);
          this.setState(prevState => {
            const key = 1 + prevState.data[prevState.data.length - 1].key
            const newItem = {
              key,
              ...values,
              date: values.date.format('YYYY-MM-DD')
            }
            const newData = prevState.data
            newData.push(newItem)
            return newData
          })
          this.handleResetAdd()
          this.setState({
            submitLoading: false,
            addVisible: false,
          })
        }, 1000);
      } else {
        this.setState({
          submitLoading: false,
        })
      }
    });
  }

  render() {
    // Add form
    const { addVisible, submitLoading } = this.state

    // Table
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
          inputType: col.dataIndex === 'money' ? 'number'
            : col.dataIndex === 'date' ? 'date-picker' : 'text',
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
          onCancel={() => this.handleAddCancel()}
          footer={null}
        >
          <WrappedAddForm
            handleSubmit={(e) => this.handleAddForm(e)}
            onCancel={() => { this.cancelAdd() }}
            submitLoading={submitLoading}
            onRef={(ref) => this.onAddFormRef(ref)}
          ></WrappedAddForm>
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