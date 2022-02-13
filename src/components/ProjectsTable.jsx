import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import LoginContext from "../contexts/LoginContext";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export default function ProjectsTable(props) {
	let { students, projects, onDeleteProject } = props;
	let { isLoggedIn } = useContext(LoginContext);
	let typeId = 0;
	let userId = "";
	if (isLoggedIn) {
		let user = JSON.parse(localStorage.user);
		typeId = user.typeId;
		userId = user.userId;
	}
	/**
	 * concat the user full name
	 * @param {*} userId
	 * @returns string
	 */
	function getStudentName(userId) {
		const student = students.filter((user) => user.userId == userId);
		return student.map((x) => x.firstName + " " + x.lastName);
	}

	return (
		<React.Fragment>
			{!projects || projects.length === 0 ? (
				<h2> No data</h2>
			) : (
				<TableContainer component={Paper}>
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
								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
									align="center"
								>
									Year
								</StyledTableCell>
								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
									align="center"
								>
									Description
								</StyledTableCell>

								<StyledTableCell
									style={{ fontWeight: "bold" }}
									className="cell"
									align="center"
								>
									Edit
								</StyledTableCell>
								{typeId !== 3 ? (
									<StyledTableCell
										style={{ fontWeight: "bold" }}
										className="cell"
										align="center"
									>
										Delete
									</StyledTableCell>
								) : (
									""
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{projects.map((project) => (
								<TableRow
									key={project.projectId}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{project.projectId}
									</TableCell>

									<TableCell align="center">{project.projectName}</TableCell>
									<TableCell align="center">
										{getStudentName(project.studentId)}
									</TableCell>
									<TableCell align="center">{project.studentId}</TableCell>
									<TableCell align="center">{project.year}</TableCell>
									<TableCell align="center">{project.description}</TableCell>
									<TableCell align="center">
										<IconButton aria-label="edit">
											<NavLink to={"/project/editProject/" + project.projectId}>
												{<Edit color="warning"></Edit>}
											</NavLink>{" "}
										</IconButton>
									</TableCell>
									{typeId !== 3 ? (
										<TableCell align="center">
											<IconButton
												aria-label="delete"
												onClick={() => onDeleteProject(project.projectId)}
											>
												<DeleteIcon color="error" />
											</IconButton>{" "}
										</TableCell>
									) : (
										""
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</React.Fragment>
	);
}
