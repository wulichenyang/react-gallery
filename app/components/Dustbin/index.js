import React, { Component, Fragment } from 'react'
import ContentBanner from '@components/ContentBanner'
import MainWrapper from '@components/MainWrapper'

import './index.less'

const DragItem = ({tip}) => {
	return (
		<li 
			className="drag-item"
			draggable="true"
		>
			{tip}
		</li>
	)
}
const DragList = ({dragList}) => {
	console.log(dragList)
	return dragList ? 
		(
			<ul className="drag-list">
				{
					dragList.map((item, id) => {
						return (<DragItem tip={item.tip} key={id}></DragItem>)
					})
				}
			</ul>
		) : null
}
const Collection = () => {
	return (
		
	)
}
class Dustbin extends Component {
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
		}
	}
	render() {
		const { dragList } = this.state
		return (
			<Fragment>
				<ContentBanner title="Collection & Dustbin"></ContentBanner>
				<MainWrapper>
					<div className="collection-wrapper">
						<div className="select-wrapper">
							<h3>拖动你的罪恶吧~~</h3>
							<DragList dragList={dragList}></DragList>
						</div>
						<div className="collection-inner">
							<div className="collection">
								<h3>Collection</h3>
							</div>
							<div className="dustbin">
								<h3>Dustbin</h3>
							</div>
						</div>
					</div>
				</MainWrapper>
			</Fragment>
		)
	}
}

export default Dustbin;