import React, { useContext, useEffect, useState } from "react";
import {
	createProject,
	getAllProjects,
	getAllTasks,
	validateProject,
} from "../services/ProjectServices";
import { Redirect } from "react-router-dom";
import { getStudents } from "../services/UserServices";
import ProjectInput from "./ProjectInput";
import LoginContext from "../contexts/LoginContext";

function CreateProject(props) {
	let { isLoggedIn } = useContext(LoginContext);
	const today = new Date();
	let [projectName, setProjectName] = useState("");
	let [year, setProjectYear] = useState(
		today.getMonth() <= 6 ? today.getFullYear() : today.getFullYear() + 1
	);
	let [studentId, setStudentId] = useState("");
	let [description, setDescription] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");
	let [submitStatus, setSubmitStatus] = useState([]);
	const [projects, setProjects] = useState([]);
	const [tasks, setTasks] = useState([]);
	let [students, setStudents] = useState([]);
	let [sendToNext, setSendToNext] = useState(false);

	let typeId = 0;
	let userId = "";
	if (isLoggedIn) {
		let user = JSON.parse(localStorage.user);
		typeId = user.typeId;
		userId = user.userId;
	}
	function getTasks() {
		getAllTasks()
			.then((res) => {
				const t = res.data;
				setTasks(t);
			})
			.catch((err) => console.log(err.response.data));
	}

	function studentsUsers() {
		getStudents()
			.then((res) => {
				const stud = res.data;
				setStudents(stud.filter((x) => x.statusId === 1));
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
		studentsUsers();
		getTasks();
	}, []);

	if (!isLoggedIn) {
		return <Redirect to="/"></Redirect>;
	}
	if (sendToNext === true) {
		return <Redirect to="/projects"></Redirect>;
	}
	return (
		<React.Fragment>
			<ProjectInput
				students={
					typeId === 3 ? students.filter((x) => x.userId == userId) : students
				}
				projects={
					typeId === 3
						? projects.filter((x) => x.studentId == userId)
						: projects
				}
				projectName={projectName}
				year={year}
				studentId={studentId}
				description={description}
				submitStatus={submitStatus}
				dialogMessage={dialogMessage}
				sendToNext={sendToNext}
				onProjectNameChange={(e) => setProjectName(e.target.value)}
				onStudentIdChange={(e) => setStudentId(e.target.value)}
				onDescriptionChange={(e) => setDescription(e.target.value)}
				onSubmit={submit}
				onReset={reset}
				actionName="Create"
			/>
		</React.Fragment>
	);

	function reset() {
		setProjectName("");
		setProjectYear("");
		setStudentId("");
		setDescription("");
		setSubmitStatus([]);
		setDialogMessage("");
	}
	/**
	 * validate the input
	 * @returns boolean
	 */
	function isValidInputs() {
		let errorMessages = validateProject({
			projectName,
			description,
		});
		//check if student already have project
		let isHaveProject = projects.filter(
			(project) => project.projectId === studentId
		);

		if (isHaveProject.length > 0) {
			errorMessages.push("User already have a project");
		}
		if (errorMessages.length > 0) {
			setSubmitStatus(errorMessages);
			return false;
		} else return true;
	}
	/**
	 *  after submit, validate input and create project
	 * @param {*} event
	 */
	function submit(event) {
		event.preventDefault();
		if (isValidInputs()) {
			createProject(
				projectName.toLowerCase(),
				year,
				studentId,
				description.toLowerCase()
			)
				.then((res) => {
					reset();
					alert("Created successfuly!");
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
export default CreateProject;
