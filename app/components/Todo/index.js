import React from 'react'
import Footer from './Footer'
import AddTodo from '@containers/Todo/AddTodo'
import VisibleTodoList from '@containers/Todo/VisibleTodoList'

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default TodoApp