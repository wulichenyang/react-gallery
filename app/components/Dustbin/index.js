import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import ContentBanner from '@components/ContentBanner'
import MainWrapper from '@components/MainWrapper'

import './index.less'

document.ondragover = e => {
	// 取消事件的默认行为
	return false;
}
document.ondragleave = e => {
	//取消被拖动的元素离开本元素时触发该事件
	return false;
}
document.ondrop = e => {
	// 取消事件的默认行为
	return false;
}

const DragItem = ({ item, onDragStart = () => {} }) => {
	return (
		<li 
			className="drag-item"
			draggable="true"
			onDragStart={onDragStart}
		>
			{item.tip}
		</li>
	)
}

const DragList = ({ dragList, onDragStart}) => {
	console.log(dragList)
	return dragList ? 
		(
			<ul className="drag-list">
				{
					dragList.map((item, id) => {
						return (
							<DragItem 
								item={item}
								key={id}
								onDragStart={onDragStart}
							>
							</DragItem>
						)
					})
				}
			</ul>
		) : null
}
const Collection = ({ onDrop, collection, onDragStart}) => {
	return (
		<div 
			className="collection"
			onDrop={onDrop}
		>
			<h3>Collection</h3>
			<ul className="collection-list">
				{
					collection ? collection.map((item, id) => {
						return (
							<DragItem
								key={id}
								item={item}
								onDragStart={(e, idx) => onDragStart(e, item.id)}
							>
							</DragItem>
						)
					}) : null
				}
			</ul>
		</div>
	)
}

const TrashCan = ({ onDrop }) => {
	return (
		<div
			className="dustbin"
			onDrop={onDrop}	
		>
			<h3>Dustbin</h3>
		</div>
	)
}

class Dustbin extends Component {
	static count = 0;
	constructor(props) {
		super(props)
		this.state = {
			dragList: [
				{
					tip: '吃饭'
				},
				{
					tip: '睡觉'
				},
				{
					tip: '打豆豆'
				},
				{
					tip: '看书'
				},
				{
					tip: '泡妞'
				},
			],
			collection: [
				// { tip: 'xx', id: 1,2,3...}
			]
		}
	}

	dragAddHandler = e => {
		e.dataTransfer.setData('text/plain', '<item>' +
			e.target.innerHTML)
			console.log(e.target)
	}

	dragDelHandler = (e, id) => {
		e.dataTransfer.setData('text/plain', '<remove>' + id)
	}

	dropAddHandler = e => {
		let text = e.dataTransfer.getData('text/plain')
		console.log(text)
		if(text.indexOf('<item>') === 0) {
			let newItem = {
				id: Dustbin.count++,
				tip: text.split('>')[1]
			}
			console.log(newItem)
			this.setState(prevState => ({
				collection: [
					...prevState.collection,
					newItem
				]
			}))
			console.log('state:' + this.state.collection)
		}
	}
	
	dropDelHandler = e => {
		let text = e.dataTransfer.getData('text/plain')
		if(text.indexOf('<remove>') === 0) {
			let id = parseInt(text.split('>')[1])
			this.setState(prevState =>({
				collection: prevState.collection.filter(item => {
					return item.id !== id
				})
			}))
		}
	}

	render() {
		const { dragList, collection } = this.state
		return (
			<Fragment>
				<ContentBanner title="Collection & Dustbin"></ContentBanner>
				<MainWrapper>
					<div className="collection-wrapper">
						<div className="collection-inner">
							<div className="select-wrapper">
								<h3>拖动你的罪恶吧！！</h3>
								<DragList 
									dragList={dragList}
									onDragStart={e => this.dragAddHandler(e)}
								>
								</DragList>
							</div>
							<div className="collection-dustbin">
								<Collection
									onDrop={e => this.dropAddHandler(e)}
									collection={collection}
									onDragStart={(e, id) => this.dragDelHandler(e, id)}
								>
								</Collection>
								<TrashCan onDrop={e => this.dropDelHandler(e)}></TrashCan>
							</div>
						</div>
					</div>
				</MainWrapper>
			</Fragment>
		)
	}
}

export default Dustbin;