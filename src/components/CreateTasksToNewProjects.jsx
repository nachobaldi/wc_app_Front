import { Button, FormControl, Grid } from "@mui/material";
import { color } from "@mui/system";
import React, { useState, useEffect } from "react";
import {
	createTaskPerProject,
	getAllProjects,
	getAllTasks,
	getAllTasksPerProjects,
} from "../services/ProjectServices";

function CreateTasksToNewProjects(props) {
	const [projects, setProjects] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [tasksPerProject, setTasksPerProject] = useState([]);
	let [dialogmessage, setDialogMessage] = useState("");
	let projectsUpdated = [];

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
	 * get all the tasks per project
	 */
	function getTasksPerProjects() {
		getAllTasksPerProjects()
			.then((res) => {
				const tpp = res.data;
				setTasksPerProject(tpp);
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
		getProjects();
		getTasks();
		getTasksPerProjects();
	}, []);

	//create task in new projects
	function setTasksToNewProjects() {
		let projectsHave = [];
		//check if project already have tasks and insert to array projects that have tasks
		tasksPerProject.map((x) =>
			projectsHave.includes(x.projectId) ? "" : projectsHave.push(x.projectId)
		);

		if (projectsUpdated != []) {
			setDialogMessage("nothing");
			projects.map((project) => {
				//check if project is the array
				if (projectsHave.includes(project.projectId)) {
				} else {
					tasks.map((task) => {
						projectsHave.push(project.projectId);
						//create task in project
						createTaskPerProject(project.projectId, task.taskId)
							.then((res) => {
								if (projectsUpdated.includes(project.projectId)) {
								} else {
									projectsUpdated.push(project.projectId);
									setDialogMessage(projectsUpdated + " ");
								}

								console.log(projectsUpdated);
							})
							.catch((err) => console.log(project.projectId));
					});
				}
			});
		}
	}
	return (
		<React.Fragment>
			{" "}
			<h1>Set Tasks to new Projects</h1>
			<hr />
			<h2 style={{ color: "yellowgreen" }}>Explanation:</h2>
			<p>
				{" "}
				When the user click the button, the system will enter to projects that
				not have yet tasks, all the tasks that the system have fot all projects{" "}
			</p>
			<br />
			<br />
			{dialogmessage == "nothing" ? (
				<h3 style={{ color: "red" }}>Not have projects without tasks</h3>
			) : (
				<div>
					<h3>tasks added to projects:</h3>
					<h3>{dialogmessage}</h3>
				</div>
			)}
			<br />
			<Grid container alignItems="center" justify="center" direction="column">
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Button
						variant="contained"
						color="primary"
						type="submit"
						onClick={setTasksToNewProjects}
					>
						Set Tasks
					</Button>
				</FormControl>
			</Grid>
		</React.Fragment>
	);
}

export default CreateTasksToNewProjects;
