import { Add } from "@mui/icons-material";
import { FormControl, IconButton } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import TasksTable from "../components/TasksTable";
import LoginContext from "../contexts/LoginContext";
import {
	deleteTask,
	deleteTaskPerProject,
	getAllProjects,
	getAllTasks,
} from "../services/ProjectServices";

function Tasks(props) {
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);
	let { isLoggedIn } = React.useContext(LoginContext);

	/**
	 * get all tasks
	 */
	function getTasks() {
		getAllTasks()
			.then((res) => {
				const t = res.data;
				setTasks(t);
			})
			.catch((err) => console.log(err.response.data));
	}
	/**
	 * get all projects
	 */
	function getProjects() {
		getAllProjects()
			.then((res) => {
				const proj = res.data;
				setProjects(proj);
			})
			.catch((err) => console.log(err.response.data));
	}
	useEffect(() => {
		getTasks();
		getProjects();
	}, []);
	if (!isLoggedIn) return <Redirect to="/login" push />;
	return (
		<React.Fragment>
			<h2>Tasks</h2>
			<FormControl
				sx={{ m: 1, width: "30ch" }}
				variant="filled"
				color="primary"
			>
				<NavLink style={{ textDecoration: "none" }} to="/AddTask">
					<IconButton className="aria" aria-label="Add">
						<Add style={{ fontSize: "200%" }} color="success"></Add> Add Task{" "}
					</IconButton>
				</NavLink>{" "}
			</FormControl>
			<TasksTable
				tasks={tasks}
				projects={projects}
				onDeleteTask={onDeleteTask}
			></TasksTable>
		</React.Fragment>
	);
	/**
	 * delete task,first from projects and then the task
	 * @param {number} taskId
	 */
	function onDeleteTask(taskId) {
		let count = 0;
		//delete task from all projects
		projects.map((p) => {
			deleteTaskPerProject(p.projectId, taskId)
				.then(count++)
				.catch((err) => alert(err.response.data));
		});
		//delete the task
		if (count == projects.length)
			deleteTaskfromTask(taskId)
				.then((res) => alert(res))
				.catch((err) => alert(err.response.data));
	}
	/**
	 * delete task
	 * @param {number} taskId
	 */
	function deleteTaskfromTask(taskId) {
		deleteTask(taskId)
			.then((res) => {
				getTasks();
			})
			.catch((err) => alert(err.response.data));
	}
}

export default Tasks;
