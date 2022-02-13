import { NavLink, Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect, useContext } from "react";
import { getAllProjects } from "../services/ProjectServices";
import { getStudents } from "../services/UserServices";
import EditProject from "./EditProject";
import Projects from "../containers/Projects";
import LoginContext from "../contexts/LoginContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

function TasksPerProjectMenu(props) {
	let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	let [projects, setProjects] = useState([]);
	let [students, setStudents] = useState([]);
	let userType = 0;
	let userName = "";
	let userId = "";
	let user = [];
	if (isLoggedIn) {
		user = JSON.parse(localStorage.user);
		userName = user.firstName + " " + user.lastName;
		userType = user.typeId;
		userId = user.userId;
	}
	function getStudentName(userId) {
		const student = students.filter((user) => user.userId == userId);
		return student.map((x) => x.firstName + " " + x.lastName);
	}
	function studentsUsers() {
		getStudents()
			.then((res) => {
				const stud = res.data;
				setStudents(stud);
			})
			.catch((err) => console.log(err.response.data));
	}
	function getProjects() {
		getAllProjects()
			.then((res) => {
				const proj = res.data;
				isLoggedIn && userType == 3
					? setProjects(proj.filter((x) => x.studentId == userId))
					: setProjects(proj);
			})
			.catch((err) => console.log(err.response.data));
	}
	useEffect(() => {
		getProjects();
		studentsUsers();
	}, []);
	return (
		<React.Fragment>
			<h1>Tasks Per Project</h1>
			<br />
			<br />
			<h6>For see tasks choose project</h6>
			<br />
			{!projects || projects.length === 0 ? (
				<h2> No data</h2>
			) : (
				<TableContainer component={Paper} sx={{ minWidth: 650 }}>
					<Table sx={{ minWidth: 650 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
								>
									Project Id
								</StyledTableCell>
								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
									align="center"
								>
									Project Name
								</StyledTableCell>
								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
									align="center"
								>
									Student Name
								</StyledTableCell>
								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
									align="center"
								>
									Student Id
								</StyledTableCell>
							</TableRow>
						</TableHead>
						{projects.map((project) => (
							<TableBody>
								<TableRow
									hover
									key={project.projectId}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									className="text-link"
									component={Link}
									style={{ textDecoration: "none" }}
									to={"/TasksPerProject/" + `${project.projectId}`}
									key={project.projectId}
								>
									<TableCell component="th" scope="row">
										{project.projectId}
									</TableCell>
									<TableCell align="center">{project.projectName}</TableCell>
									<TableCell align="center">
										{getStudentName(project.studentId)}
									</TableCell>
									<TableCell align="center">{project.studentId}</TableCell>{" "}
								</TableRow>
							</TableBody>
						))}
					</Table>
				</TableContainer>
			)}
		</React.Fragment>
	);
}

export default TasksPerProjectMenu;
