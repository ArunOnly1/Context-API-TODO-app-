import { TagFilled } from '@ant-design/icons'
import { notification } from 'antd'
import { createContext, useState } from 'react'

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
	const [showDialog, setShowDialog] = useState(false)
	const [todos, setTodos] = useState([])

	const [mode, setMode] = useState('ADD')

	const [formValue, setFormValue] = useState({
		title: '',
		description: '',
	})
	const openAddDialog = () => {
		setMode('ADD')
		setFormValue({
			title: '',
			description: '',
		})
		setShowDialog(true)
	}

	const openEditDialog = (values) => {
		setMode('EDIT')
		setFormValue(values)
		setShowDialog(true)
	}

	const addTodo = (todo) => {
		// Add new todo to the existing list
		setTodos([todo, ...todos])

		// Close the dialog
		setShowDialog(false)

		// SUCCESS notification
		notification.success({
			message: 'Todo added!',
			description: 'Your todo has been added successfully!',
			duration: 2,
			placement: 'topLeft',
		})
	}

	const editTodo = (editedTodo) => {
		const newTodos = todos.map((todo) => {
			if (editedTodo.id === todo.id) {
				return editedTodo
			} else {
				return todo
			}
		})

		setTodos(newTodos)

		// Show notification
		notification.success({
			message: 'Todo edited!',
			description: 'Your todo has been edited successfully!',
			duration: 2,
			placement: 'topLeft',
		})

		// Close the dialog

		setShowDialog(false)
	}
	const deleteTodo = (id) => {
		// Filter out all todos except one that matches the id ...
		const updatedTodos = todos.filter((todo) => todo.id !== id)
		setTodos(updatedTodos)

		// Show notification to the user
		notification.success({
			message: 'Todo deleted successfully!',
			placement: 'topLeft',
		})
	}

	const markTodo = (id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					completed: true,
				}
			} else {
				return todo
			}
		})

		setTodos(updatedTodos)
	}

	return (
		<TodoContext.Provider
			value={{
				todos,
				showDialog,
				setShowDialog,
				addTodo,
				editTodo,
				deleteTodo,
				mode,
				openAddDialog,
				openEditDialog,
				formValue,
				markTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}
