import React, { useEffect, useState } from "react";
import {
	createTask,
	createTaskPerProject,
	getAllProjects,
	getAllTasks,
	getTaskIdbyTaskName,
} from "../services/ProjectServices";
import TaskInput from "./TaskInput";

function CreateTask(props) {
	let [tasks, setTasks] = useState("");
	let [taskName, setTaskName] = useState("");
	let [taskPercentage, setTaskPercentage] = useState("");
	let [projects, setProjects] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");
	let [submitStatus, setSubmitStatus] = useState([]);
	let [sendToNext, setSendToNext] = useState(false);

	function getTasks() {
		getAllTasks()
			.then((res) => {
				const t = res.data;
				setTasks(t);
			})
			.catch((err) => console.log(err.response.data));
	}
	function getProjects() {
		getAllProjects()
			.then((res) => {
				const proj = res.data;
				setProjects(proj);
			})
			.catch((err) => console.log(err.response.data));
	}
	useEffect(() => {
		getProjects();
		getTasks();
	}, [tasks]);
	return (
		<React.Fragment>
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
				actionName="Create"
			/>
		</React.Fragment>
	);
	function createTaskInProject(taskId) {
		//create task in all projects
		projects.map((project) =>
			createTaskPerProject(project.projectId, taskId).catch((err) =>
				setDialogMessage(err.response.data)
			)
		);
	}
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
			if (x.taskName == taskName) {
				errorMessages = "Task name already exists";
			}
		});

		if (errorMessages.length > 0) {
			setSubmitStatus(errorMessages);
			return false;
		} else return true;
	}
	/**
	 *  after submit, validate input and create user
	 * @param {*} event
	 */
	function submit(event) {
		event.preventDefault();

		if (isValidInputs()) {
			//create task
			createTask(taskName, taskPercentage)
				.then((res) => {
					//get the task that was created
					getTaskIdbyTaskName(taskName)
						.then((res) => {
							let taskId = res.data;
							console.log("task" + taskId);
							//create task in all projects
							createTaskInProject(taskId);
						})
						.catch((err) => {
							setDialogMessage(err.response.data);
						});
					alert("Task Created successfuly!");
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
export default CreateTask;
