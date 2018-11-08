import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Icon, Button, Input, Form, Checkbox } from 'antd'
import VanillaTilt from 'vanilla-tilt'
import App from '@containers/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '@reducers'
import axios from 'axios'
import '@styles/reset.css'
import '@styles/theme.less'
import '@styles/main.less'

const store = createStore(rootReducer);

const rootElement = document.getElementById('root')

ReactDOM.render(
	<Provider store={store}>
		<App/>
  </Provider>,
  rootElement
)

// // const element = React.createElement( 'div', {
// //   className: 'container',
// //   children: [     
// //     'Hello World',
// //     'Boom hehe'
// //   ]
// // })
// // const Message = props => <div>{props.msg}</div>

// class Hello extends Component {
//   static propTypes = {
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//   }
//   render() {
//     const {firstName, lastName} = this.props
//     return (
//       <div>
//         Hello {firstName || 'unknown'} {lastName || 'unknown'}
//       </div>
//     )
//   }
// }

// const Message = ({msg}) => {
//   return (
//     <div>
//       {msg ? (
//         <div>{msg}</div>
//       ) : (
//         <div>no message</div>
//       )}
//     </div>
//   )
// }
// const Tick = () => {
//   const time = new Date().toLocaleTimeString()
//   const element = (
//     <div>
//       <Input value={time} />
//     </div>
//   )
//   ReactDOM.render(element, rootElement)
// }
// const Box = ({
//   className = '',
//   size,
//   style,
//   ...rest
// }) => {
//   const sizeClassName = size ? `box-${size}` : ''
//   return (
//     <div>
//       <div 
//         className={`box ${className} ${sizeClassName}`}
//         style={{paddingLeft:20, ...style}}
//         {...rest}
//       >
//       </div>
//     </div>
//   )
// }
  
// const state = {eventCount: 0, username: ''}
// // const setState = newState => {
// //   Object.assign(state, newState)
// //   renderApp()
// // }
// const increment = () => {
//   setState({eventCount: ++state.eventCount})
// }
// const updateUsername = e => {
//   setState({username: e.target.value})
// }
// const FormItem = Form.Item
// const Count = () => 
//   (
//     <div>
//       <p>
//         They have been {state.eventCount} events
//       </p>
//       <p>
//         <Button onClick={increment}><Icon type="plus"></Icon></Button>
//       </p>
//       <p>You typed: {state.username}</p>
//       <Form className="login-form">
//         <FormItem>
//           <Input 
//             prefix={
//               <Icon 
//                 type="user"
//                 style={{ color: 'rgba(0,0,0,.25)' }} 
//               />
//             }
//             onChange={updateUsername}
//             placeholder="input name" 
//           />
//         </FormItem>
//       </Form>
//     </div>
//   )
// // const msg = props => <div>{props.msg}</div>
// const element = (
//   <div className="container">
//     <Hello firstName='li' lastName="chenyang"/>
//     <Message msg="I love u"/>
//     <Box size="small" className="heheda" style={{backgroundColor: 'lightblue'}}>small box</Box>
//     <Box size="medium" style={{backgroundColor: 'pink'}}>medium box</Box>
//     <Box size="large" style={{backgroundColor: 'lightgreen'}}>large box</Box>
//   </div>
// )

// class StopWatch extends Component {
//   state = {
//     lapse: 0,
//     running: false,
//     showStopWatch: true,
//   }
//   handleRunClick = () => {
//     this.setState(state => {
//       if(state.running) {
//         clearInterval(this.timer)
//       } else {
//         const startTime  = Date.now() - this.state.lapse
//         this.timer = setInterval(() => {
//           this.setState({
//             lapse : Date.now() - startTime
//           })
//         })
//       }
//       return {running: !state.running}
//     })
//   }
//   handleClearClick = () => {
//     clearInterval(this.timer)
//     this.setState({lapse: 0, running: false})
//   }
//   toggleStopWatch = e => {
//     this.setState({showStopWatch : !e.target.checked})
//   }
//   componentWillUnmount() {
//     clearInterval(this.timer)
//   }
//   render() {
//     const {lapse, running, showStopWatch} = this.state
//       return (
//         <div>
//           <Checkbox onChange={this.toggleStopWatch}>remove stopWatch</Checkbox>
//           {
//             showStopWatch ? 
//               (
//                 <div>
//                   <label 
//                     style={{fontSize: '5em', display: 'block'}}
//                   >
//                     {lapse}ms
//                   </label>
//                   <Button onClick={this.handleRunClick}>
//                     {this.state.running ? 'stop' : 'start'}
//                   </Button>
//                   <Button onClick={this.handleClearClick}>
//                     clear
//                   </Button>
//                 </div>
//               ) : null
//           }
//         </div>
//       )
//   }
// }

// class Counter extends Component {
//   constructor(...args) {
//     super(...args)
//   }
//   state = {count: 0}
//   handleCounterPlus = () => {
//     this.setState(({count}) => ({
//       count: count + 1
//     }))
//   }
//   render() {
//     return (
//       <Button
//         onClick={this.handleCounterPlus}
//       >
//         {this.state.count}
//       </Button>
//     )
//   }
// }

// class Tilt extends Component {
//   componentDidMount() {
//     VanillaTilt.init(this.tiltNode, {
//       max: 25,
//       speed: 400,
//       glare: true,
//       'max-glare': 0.5,
//     })
//   }
//   render() {
//     console.log(this.props)
//     return (
//       <div
//         ref={node => (this.tiltNode = node)}
//         className="tilt-root"
//       >
//         <div className="tilt-child">
//           <div {...this.props} />
//         </div>
//       </div>
//     )
//   }
// }
// const tilt = (
//   <div className="totally-centered">
//     <Tilt>
//       vanilla-tilt.js
//     </Tilt>
//   </div>
// )

// const getErrorMessage = value => {
//   if(value.length < 3) {
//     return 'At least 3 charactors.'
//   } else if(value.includes('s')) {
//     return "'s' should not be in name."
//   }
//   return null
// }

// class NameForm extends Component {
//   handleSubmit = e => {
//     e.preventDefault()
//     console.log(e.target[0].value)
//     console.log(e.target.elements.username.value)
//     console.log(this.inputNode.value)
//   }
//   state = {error: null}
//   handleChange = e => {
//     const {value} = e.target
//     this.setState({
//       error: this.props.getErrorMessage(value)
//     })
//   }
//   componentDidMount() {
//     this.setState({
//       error: this.props.getErrorMessage('')
//     })
//   }

//   render() {
//     const{error} = this.state

//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="username" 
//             ref={node => (this.inputNode = node)}
//             onChange={this.handleChange}
//           />
//         </label>
//         {error? (
//           <div style={{color: 'red'}}>
//             {error}
//           </div>
//           ) : null}
//         <button 
//           type="submit"
//           disabled={Boolean(error)}
//         >
//           Submit
//         </button>
//       </Form>
//     )
//   }
// }

// class Fruit extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {items: []}
//   }
//   static allItems = [
//     {id: 'a', value: 'apple'},
//     {id: 'o', value: 'orange'},
//     {id: 'g', value: 'grape'},
//     {id: 'p', value: 'pear'},
//   ]
//   addItem = () => {
//     this.setState(({items}) => ({
//       items: [
//         ...items,
//         Fruit.allItems.find(
//           i => !items.includes(i),
//         ),
//       ],
//     }))
//   }
//   removeItem = item => {
//     this.setState(({items}) => ({
//       items: items.filter(i => i !== item)
//     }))
//   }
//   render() {
//     const {items} = this.state
//     return (
//       <div>
//         <ul>
//           {items.map(item=> (
//             <div key={item.id}>
//               <li>{item.value}</li>
//               <button onClick={() => this.removeItem(item)}>-</button>
//             </div>
//           ))}
//         </ul>
//         <button 
//           onClick={this.addItem}
//           disabled={
//             items.length >= Fruit.allItems.length
//           }
//         >
//           +
//         </button>
//       </div>
//     )
//   }
// }

// class UserCompany extends Component {
//   state = {company: undefined}
//   componentDidMount() {
//     axios({
//       url: 'https://api.github.com.graphql',
//       method: 'post',
//       data: {
//         query: `{
//           user(login: "${this.props.username}") {
//             company
//           }
//         }`
//       },
//       headers: {
//         Authorization: `bearer b5ec78fffeb583595982196ff42a3abc70ca545b`
//       }
//     }).then(res => {
//       this.setState({
//         loaded: true,
//         company: res.data.data.user.company
//       })
//     }, error => {
//       this.setState({
//         error,
//         loaded: true,
//       })
//     })
//   }
//   render() {
//     return this.state.error ? 'error' : this.state.loaded
//       ? this.state.company || 'Unknown'
//       : '...'
//   }
// }
// const username = 'wulichenyang'
// const userElement = (
//   <div>
//     <div>
//       {`@${username} works at `}
//       <UserCompany username={username} />
//     </div>
//   </div>
// )

// const store =  createStore(rootReducer)

// const renderApp = () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   rootElement)
// }

// renderApp();
// // Tick()
// // setInterval(Tick, 1000)