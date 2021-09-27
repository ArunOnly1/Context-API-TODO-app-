import { Col, Row } from 'antd'
import 'antd/dist/antd.css'
import Title from 'antd/lib/typography/Title'
import { useContext } from 'react'
import './App.css'
import AddEditTodo from './components/AddEditTodo'
import TodoCard from './components/TodoCard'
import { TodoContext } from './contexts/TodoContext'
function App() {
	const { todos } = useContext(TodoContext)
	return (
		<>
			{/* Dialog that adds / edit todo */}
			<AddEditTodo />

			{/* Content */}
			<section>
				<Title level={1}>My Todos</Title>

				{/* Todo cards */}
				<div
				// style={{
				// 	display: 'flex',
				// 	flexDirection: 'column',
				// 	gap: 20,
				// 	marginBottom: 100,
				// }}
				>
					{/* If there are no todos display a helper message to the user */}
					{todos.filter((todo) => !todo.completed).length === 0 &&
						'No Todos...Please add todos from the top-right button.'}

					<Row
						gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
						justify='center'
					>
						{todos
							// Filter out the todos which are not completed.
							.filter((todo) => !todo.completed)
							.map((todo) => (
								// xl = extra large screens
								// lg = large screens
								// md = medium screens
								// sm = small screens
								// xs = extra small screens
								<Col key={todo.id}>
									<TodoCard
										id={todo.id}
										title={todo.title}
										description={todo.description}
										completed={todo.completed}
									/>
								</Col>
							))}
					</Row>
				</div>
			</section>

			{/* Completed todos */}
			<section>
				<Title level={1}>Completed Todos</Title>

				{/* Todo cards */}
				<div
				// style={{
				// 	display: 'flex',
				// 	flexDirection: 'column',
				// 	gap: 20,
				// 	marginBottom: 100,
				// }}
				>
					{/* If there are no todos display a helper message to the user */}
					{todos.filter((todo) => todo.completed).length === 0 &&
						'No Completed Todos...Press the check button to mark them as completed.'}

					<Row gutter={[10, 10]} justify='center'>
						{todos
							// Filter out the todos which are completed
							// .filter((todo) => todo.completed)
							.filter((todo) => {
								if (todo.completed === true) {
									return true
								} else {
									return false
								}
							})
							.map((todo) => (
								// xl = extra large screens
								// lg = large screens
								// md = medium screens
								// sm = small screens
								// xs = extra small screens
								<Col key={todo.id}>
									<TodoCard
										id={todo.id}
										title={todo.title}
										description={todo.description}
										completed={todo.completed}
									/>
								</Col>
							))}
					</Row>
				</div>
			</section>
		</>
	)
}

export default App
