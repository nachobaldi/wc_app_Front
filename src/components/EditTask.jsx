import React, { useState, useEffect } from "react";
import {
	editTask,
	getAllTasks,
	getTaskById,
} from "../services/ProjectServices";
import TaskInput from "./TaskInput";
function EditTask(props) {
	let [taskId, setTaskId] = useState(props.match.params.taskId);
	let [taskName, setTaskName] = useState("");
	let [taskPercentage, setTaskPercentage] = useState("");
	let [tasks, setTasks] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");
	let [submitStatus, setSubmitStatus] = useState([]);
	let [sendToNext, setSendToNext] = useState(false);

	function getTask() {
		getTaskById(taskId)
			.then((res) => {
				let t = res.data;
				setTaskName(t.taskName);
				setTaskId(taskId);
				setTaskPercentage(t.taskPercentage * 100);
			})
			.catch((err) => setDialogMessage(err.response.data));
	}
	function getTasks() {
		getAllTasks()
			.then((res) => {
				const t = res.data;
				setTasks(t);
			})
			.catch((err) => setDialogMessage(err.response.data));
	}

	useEffect(() => {
		getTask();
		getTasks();
	}, []);

	return (
		<React.Fragment>
			<h3>{submitStatus}</h3>
			<br />
			<div>{dialogMessage}</div>
			<br />
			<TaskInput
				taskName={taskName}
				taskPercentage={taskPercentage}
				submitStatus={submitStatus}
				dialogMessage={dialogMessage}
				sendToNext={sendToNext}
				ontaskNameChange={(e) => setTaskName(e.target.value)}
				onTaskPercentageChange={(e) => setTaskPercentage(e.target.value)}
				onSubmit={submit}
				onReset={reset}
				actionName="Update"
			/>
		</React.Fragment>
	);
	function reset() {
		setTaskName("");
		setTaskPercentage("");
		setSubmitStatus([]);
		setDialogMessage("");
	}
	/**
	 * validate input
	 * @returns boolean
	 */
	function isValidInputs() {
		let errorMessages = "";
		tasks.map((x) => {
			if (x.taskName == taskName && x.taskId != taskId) {
				errorMessages = "Task name already exists";
			}
		});

		if (errorMessages.length > 0) {
			setSubmitStatus(errorMessages);
			return false;
		} else return true;
	}
	/**
	 *  after submit, validate input and edit task
	 * @param {*} event
	 */
	function submit(event) {
		event.preventDefault();

		if (isValidInputs()) {
			editTask(taskId, taskName, taskPercentage)
				.then((res) => {
					alert(res.data);
					setDialogMessage("Task updated successfuly!");
					setSendToNext(true);
				})

				.catch((err) => {
					setDialogMessage(err.response.data);
				});
		} else {
			setSendToNext(false);
		}
	}
}

export default EditTask;
