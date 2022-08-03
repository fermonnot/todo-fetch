import React, { useEffect, useState } from "react";




const Todo = () => {
	const [task, setTask] = useState({ label: "", done: false })
	const [listTask, setListask] = useState([])

	const addTask = async() => {
		if (task.label.trim() !== "") {
			try {
				let response = await fetch(`${urlBase}/${userBase}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([...listTask, task])
				})
				console.log(response)
				if (response.ok) {
					getTodos(), setTask({ ...task, label: "" })
				}

			} catch (error) {
				console.log("explote "(error))
			}
		}

	}

	const handleKey = async (event) => {
		if (event.key === "Enter") {
			if (task.label.trim() !== "") {
				try {
					let response = await fetch(`${urlBase}/${userBase}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify([...listTask, task])
					})
					console.log(response)
					if (response.ok) {
						getTodos(), setTask({ ...task, label: "" })
					}

				} catch (error) {
					console.log("explote "(error))
				}
			}
		}
	}
	const deleteTask = async (id) => {
		let newList = listTask.filter((item, index) => {
			return (id !== index)
		});
		try {
			let response = await fetch(`${urlBase}/${userBase}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newList)
			});
			if (response.ok) {
				getTodos()
			};
		} catch (error) {
			console.log("explote"(error))
		}
	}
	const handleChange = (event) => {
		setTask({
			...task,
			[event.target.name]: event.target.value
		})
		console.log(task)
	}

	const urlBase = "http://assets.breatheco.de/apis/fake/todos/user"
	const userBase = "Fernando"
	const getTodos = async () => {
		try {
			let response = await fetch(`${urlBase}/${userBase}`)
			let data = await response.json()
			if (response.status !== 404) {
				setListask(data)
			} else {
				let responseTodos = await fetch(`${urlBase}/${userBase}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([]),
				})
				if (responseTodos.ok) {
					getTodos()
				}
			}
		} catch (error) {
			console.log("explote "(error))
		}
	}
	useEffect(() => { getTodos() }, [])

	return (
		<div className="counter">
			<div className="col-12 row justify-content-center">
				<h3 className="text-center" >FINISH TO BEING AN EXCELLENT DEVELOPER!</h3>
				<div className="col-8 md d-flex flex-column align-items-center  ">
					<form onSubmit={(event) => { event.preventDefault(); }}>
						<input
							className="input"
							onKeyDown={handleKey}
							placeholder="Enter
							 your Task, Please"
							onChange={handleChange}
							name="label"
							value={task.label}
						/>
					</form>
					<button
						type="button"
						className="btn btn-primary my-2 "
						onClick={addTask}>
						Save
					</button>
				</div>
				<div className="card col-8 md shadow-lg">
					<ul className="justify-content-center">
						{
							listTask.map((tak, i) => {
								return (
									<li key={i} className="listT d-flex justify-content-between border-bottom">

										{tak.label}
										<i
											onClick={() => { deleteTask(i) }}
											className="close far fa-times-circle mx-5 p-2"
											type="button"
										>
										</i>
									</li>
								)
							})
						}</ul>
				</div>
			</div>
		</div>
	)
};

export default Todo;
