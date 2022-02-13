import { Edit } from "@mui/icons-material";
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import {
	getAllTasks,
	getAllTasksPerProject,
	getProjectById,
} from "../services/ProjectServices";
import { getUserById } from "../services/UserServices";
import { StyledTableCell } from "./ProjectsTable";

function TasksPerProject(props) {
	let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	let [projectId, setProjectId] = useState(props.match.params.projectId);
	let [tasks, setTasks] = useState([]);
	let [projectName, setProjectName] = useState("");
	let [studentId, setStudentId] = useState("");
	let [dialogMessage, setDialogMessage] = useState("");
	let [firstName, setFirstName] = useState("");
	let [lastName, setLastName] = useState("");
	let [email, setEmail] = useState("");
	let [phoneNum, setPhoneNum] = useState("");
	let [tasksPerProject, setTaskPerProject] = useState([]);
	let total = 0;
	let user = [];
	if (isLoggedIn) {
		user = JSON.parse(localStorage.user);
	}

	function getTasks() {
		getAllTasks()
			.then((res) => {
				const t = res.data;
				setTasks(t);
			})
			.catch((err) => console.log(err.response.data));
	}
	function getUser() {
		getUserById(studentId)
			.then((res) => {
				let user = res.data;
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setEmail(user.email);
				setPhoneNum(user.phoneNum);
			})
			.catch((err) => setDialogMessage(err.response.data));
	}

	function getProject() {
		getProjectById(projectId)
			.then((res) => {
				let proj = res.data;
				setProjectId(proj.projectId);
				setProjectName(proj.projectName);
				setStudentId(proj.studentId);
			})
			.catch((err) => setDialogMessage(err.response.data));
	}

	function getTasksPerProject() {
		getAllTasksPerProject(projectId)
			.then((res) => {
				const t = res.data;
				setTaskPerProject(t);
			})
			.catch((err) => console.log(err.response.data));
	}
	//get grade for task
	function getGradeforTask(taskId) {
		const t = tasksPerProject.filter((x) => x.taskId === taskId);
		return t.map((x) => x.grade);
	}
	//check if the project tasks have already grades
	function isHaveGrades() {
		let check = tasksPerProject.filter((x) => x.grade === -1);
		if (check.length > 0) return false;
		else {
			return true;
		}
	}
	// calculate the total grade (final grade)
	function getTotalGrade() {
		total = tasks.reduce((a, v) => (a = a + v.taskPercentage * 100), 0);

		if (total === 100) {
			if (isHaveGrades()) {
				let percentageArray = [];
				let gradesArray = [];
				tasks.map((x) => percentageArray.push(x.taskPercentage));
				tasksPerProject.map((x) => gradesArray.push(x.grade));
				return percentageArray.reduce(function (r, a, i) {
					return r + a * gradesArray[i];
				}, 0);
			} else return "Not have grades in all the Tasks yet.";
		} else return "percentage not 100%.";
	}
	useEffect(() => {
		getProject();
		getTasks();
		getTasksPerProject();
	}, []);

	return (
		<React.Fragment>
			<h1>{projectName}</h1>
			{getUser()}
			<h2>
				{firstName !== undefined && lastName !== undefined
					? firstName + " " + lastName + " | " + studentId
					: ""}
			</h2>
			<h2>
				{email} | {phoneNum}{" "}
			</h2>
			<hr />

			<div>
				<h4>Grade : {getTotalGrade()}</h4>
			</div>
			<Button sx={{ m: 1, width: "25ch" }} variant="contained" color="primary">
				<NavLink
					style={{ textDecoration: "none", fontSize: "16px" }}
					className="menu"
					to="/submitProject"
				>
					Submit Project
				</NavLink>{" "}
			</Button>
			<TableContainer sx={{ alignItems: "center" }} component={Paper}>
				<Table aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell
								style={{ fontWeight: "bold", textAlign: "center" }}
								className="cell"
							>
								Task name
							</StyledTableCell>
							<StyledTableCell
								style={{ fontWeight: "bold" }}
								className="cell"
								align="center"
							>
								Percentage
							</StyledTableCell>
							<StyledTableCell
								style={{ fontWeight: "bold" }}
								className="cell"
								align="center"
							>
								Grade
							</StyledTableCell>
							{isLoggedIn && user.typeId !== 3 ? (
								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
									align="center"
								>
									Edit Grade
								</StyledTableCell>
							) : (
								""
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.map((task) => (
							<TableRow
								key={task.taskId}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
								}}
							>
								<TableCell align="center" component="th" scope="row">
									{task.taskName}
								</TableCell>
								<TableCell align="center">
									{Math.round(task.taskPercentage * 100)}%
								</TableCell>
								<TableCell align="center">
									{getGradeforTask(task.taskId) == -1
										? "not have yet"
										: getGradeforTask(task.taskId)}
								</TableCell>
								{isLoggedIn && user.typeId !== 3 ? (
									<TableCell align="center">
										<IconButton aria-label="edit">
											<NavLink
												to={
													"/taskPerProject/editGrade/" +
													projectId +
													"/" +
													task.taskId
												}
											>
												{<Edit color="warning"></Edit>}
											</NavLink>{" "}
										</IconButton>
									</TableCell>
								) : (
									""
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}

export default TasksPerProject;
