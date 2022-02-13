import React, { useState, useContext, useEffect } from "react";
import {
	editProject,
	getProjectById,
	validateProject,
} from "../services/ProjectServices";
import { getStudents } from "../services/UserServices";
import ProjectInput from "./ProjectInput";

function EditProject(props) {
	const today = new Date();
	let [projectId, setProjectId] = useState(props.match.params.projectId);
	let [projectName, setProjectName] = useState("");
	let [year, setProjectYear] = useState(
		today.getMonth() <= 6 ? today.getFullYear() : today.getFullYear() + 1
	);
	let [studentId, setStudentId] = useState("");
	let [description, setDescription] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");
	let [submitStatus, setSubmitStatus] = useState([]);

	let [students, setStudents] = useState([]);
	let [sendToNext, setSendToNext] = useState(false);

	function studentsUsers() {
		getStudents()
			.then((res) => {
				const stud = res.data;
				setStudents(stud);
			})
			.catch((err) => console.log(err.response.data));
	}
	function getProject() {
		getProjectById(projectId)
			.then((res) => {
				let proj = res.data;
				setProjectId(proj.projectId);
				setProjectName(proj.projectName);
				setProjectYear(proj.year);
				setStudentId(proj.studentId);
				setDescription(proj.description);
				setSubmitStatus([]);
				setDialogMessage("");
			})
			.catch((err) => setDialogMessage(err.response.data));
	}

	useEffect(() => {
		getProject();
		studentsUsers();
	}, [projectId]);
	return (
		<React.Fragment>
			<br />
			<div>{dialogMessage}</div>
			<br />
			<ProjectInput
				students={students}
				projectName={projectName}
				year={year}
				projectId={projectId}
				studentId={studentId}
				description={description}
				submitStatus={submitStatus}
				sendToNext={sendToNext}
				onProjectNameChange={(e) => setProjectName(e.target.value)}
				onStudentIdChange={(e) => setStudentId(e.target.value)}
				onDescriptionChange={(e) => setDescription(e.target.value)}
				onSubmit={submit}
				onReset={reset}
				actionName="Update"
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
	 * validate input
	 * @returns boolean
	 */
	function isValidInputs() {
		let errorMessages = validateProject({
			projectName,
			description,
		});
		if (errorMessages.length > 0) {
			setSubmitStatus(errorMessages);
			return false;
		} else return true;
	}
	/**
	 *  after submit, validate input and edit project
	 * @param {*} event
	 */
	function submit(event) {
		event.preventDefault();

		if (isValidInputs()) {
			editProject(
				projectId,
				projectName.toLowerCase(),
				year,
				studentId,
				description.toLowerCase()
			)
				.then((res) => {
					reset();
					alert("Updated successfuly!");
					setDialogMessage("Updated successfuly!");
					setSendToNext(true);
				})
				.catch((err) => {
					setDialogMessage(err.response.data);
				});
		}
	}
}
export default EditProject;
