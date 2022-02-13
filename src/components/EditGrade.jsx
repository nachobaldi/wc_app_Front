import { Button, FormControl, FormLabel, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
	editTaskPerProject,
	getProjectById,
} from "../services/ProjectServices";
import { getUserById } from "../services/UserServices";
import emailjs from "@emailjs/browser";
function EditGrade(props) {
	let { projectId, taskId } = props.match.params;
	let [grade, setGrade] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");
	let [submitStatus, setSubmitStatus] = useState([]);
	let [sendToNext, setSendToNext] = useState(false);
	let [project, setProject] = useState([]);
	let [email, setEmail] = useState("");
	let [studentId, setStudentId] = useState("");

	function getEmail(studentId) {
		return email;
	}
	function getProject() {
		getProjectById(projectId)
			.then((res) => {
				const proj = res.data;
				setProject(proj);
				setStudentId(proj.studentId);
			})

			.catch((err) => console.log(err.response.data));
	}
	function getUser() {
		getUserById(project.studentId)
			.then((res) => {
				let user = res.data;
				setEmail(user.email);
			})
			.catch((err) => setDialogMessage(err.response.data));
	}

	useEffect(() => {
		getProject();
		getUser();
	}, []);

	if (sendToNext === true) {
		emailjs
			.send(
				"service_goyag1b",
				"template_jalz8so",
				{
					user: studentId,
					notes: "Grade has been updated!",
					user_email: getEmail(email),
				},
				"user_V5GWnvouIs6O3F6Xj5u9u"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);

		return <Redirect to={"/TasksPerProject/" + projectId}></Redirect>;
	}
	return (
		<React.Fragment>
			{" "}
			<h1>Edit Grade</h1>
			<Grid container alignItems="center" justify="center" direction="column">
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<FormLabel sx={{ fontWeight: "bold" }} required>
						Grade
					</FormLabel>
					<Grid item>
						<TextField
							sx={{ m: 1, width: "20ch" }}
							type="number"
							placeholder="Set Grade"
							value={grade}
							InputProps={{ inputProps: { min: 0, max: 100 } }}
							onChange={(e) => setGrade(e.target.value)}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Button
						disabled={grade != "" ? false : true}
						variant="contained"
						color="primary"
						type="submit"
						onClick={submit}
					>
						Update Grade
					</Button>
				</FormControl>
				<FormControl
					sx={{ m: 1, width: "30ch" }}
					variant="outlined"
				></FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Button
						variant="contained"
						color="primary"
						type="reset"
						onClick={reset}
					>
						Reset
					</Button>
				</FormControl>
			</Grid>
		</React.Fragment>
	);
	function reset() {
		setGrade("");
		setSubmitStatus([]);
		setDialogMessage("");
	}
	/**
	 *  after submit, edit grade
	 * @param {*} event
	 */
	function submit(event) {
		event.preventDefault();
		getUser();
		editTaskPerProject(projectId, taskId, grade)
			.then((res) => {
				alert("Updated successfuly!");
				setDialogMessage("Updated successfuly!");
				setSendToNext(true);
				reset();
			})
			.catch((err) => {
				setDialogMessage(err.response.data);
			});
	}
}

export default EditGrade;
