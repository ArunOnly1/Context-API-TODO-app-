import { PlusOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Button } from 'antd'
import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'
import { v4 as uuidv4 } from 'uuid'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

const AddEditTodo = () => {
	const [todoForm] = Form.useForm()
	const {
		showDialog,
		setShowDialog,
		addTodo,
		mode,
		openAddDialog,
		formValue,
		editTodo,
	} = useContext(TodoContext)

	// Fill the form with the values provided in "formValue"
	todoForm.setFieldsValue(formValue)

	// For responsive designs
	const breakpoints = useBreakpoint()

	return (
		<>
			{/* Add todo dialog box */}
			<div
				style={{
					display: 'flex',
					justifyContent: breakpoints.xs ? 'center' : 'flex-end',
				}}
			>
				<Button onClick={openAddDialog} type='default'>
					<PlusOutlined
						style={{
							marginRight: '0.5rem',
						}}
					/>
					Antd Button
				</Button>
			</div>

			<Modal
				title={`${mode === 'ADD' ? 'New' : 'Edit'}Todo`}
				visible={showDialog}
				onCancel={() => setShowDialog(false)}
				footer={null}
				afterClose={() => {
					todoForm.resetFields()
				}}
			>
				<Form
					form={todoForm}
					initialValues={{
						title: '',
						description: '',
					}}
					onFinish={({ title, description }) => {
						if (mode === 'ADD') {
							const todo = {
								// Add new todo
								id: uuidv4(),
								title,
								description,
								completed: false,
							}
							addTodo(todo)
						} else {
							const todo = { id: formValue.id, title, description }
							editTodo(todo)
						}
					}}
					layout='vertical'
					form={todoForm}
				>
					<Form.Item
						label='Title'
						name='title'
						rules={[
							{
								required: true,
								message: 'Title is required!',
							},
						]}
					>
						<Input placeholder='Do something...' />
					</Form.Item>

					<Form.Item
						label='Description'
						name='description'
						rules={[
							{
								required: true,
								message: 'Description is required!',
							},
						]}
					>
						<Input.TextArea
							rows={5}
							placeholder='Description about your task...'
						/>
					</Form.Item>

					<Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>
						{mode === 'ADD' ? 'Add' : 'Save'} Todo
					</Button>
					<Button
						// on click, close the dialog box
						onClick={() => setShowDialog(false)}
						type='primary'
					>
						Cancel
					</Button>
				</Form>
			</Modal>
		</>
	)
}

export default AddEditTodo
