import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Card, Popconfirm } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

const TodoCard = ({ id, title, description, completed }) => {
	const { deleteTodo, openEditDialog, markTodo } = useContext(TodoContext)
	return (
		<div>
			<Card
				style={{
					border: '1px solid tomato',
					width: 300,
				}}
				actions={
					completed
						? []
						: [
								<EditOutlined
									key='edit'
									onClick={() => openEditDialog({ id, title, description })}
								/>,
								<Popconfirm
									title='Are you sure to delete this task?'
									// onConfirm={confirm}
									// onCancel={cancel}
									okText='Yes'
									cancelText='No'
									onConfirm={() => {
										deleteTodo(id)
									}}
								>
									<DeleteOutlined />
								</Popconfirm>,
								<CheckOutlined key='check' onClick={() => markTodo(id)} />,
						  ]
				}
			>
				<Meta title={title} description={description} />
			</Card>
			,
		</div>
	)
}

export default TodoCard
