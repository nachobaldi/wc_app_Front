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

import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export default function TasksTable(props) {
	let { tasks, projects, onDeleteTask } = props;

	return (
		<React.Fragment>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell style={{ fontWeight: "bold" }} className="cell">
								Task Id
							</StyledTableCell>
							<StyledTableCell
								style={{ fontWeight: "bold" }}
								className="cell"
								align="center"
							>
								Task Name
							</StyledTableCell>
							<StyledTableCell
								style={{ fontWeight: "bold" }}
								className="cell"
								align="center"
							>
								Task Percentage
							</StyledTableCell>
							<StyledTableCell
								style={{ fontWeight: "bold" }}
								className="cell"
								align="center"
							>
								Edit
							</StyledTableCell>
							<StyledTableCell
								style={{ fontWeight: "bold" }}
								className="cell"
								align="center"
							>
								Delete
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!tasks || tasks.length === 0 ? (
							<h2>No data</h2>
						) : (
							tasks.map((task) => (
								<TableRow
									key={task.taskId}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{task.taskId}
									</TableCell>

									<TableCell align="center">{task.taskName}</TableCell>
									<TableCell align="center">
										{Math.round(task.taskPercentage * 100)}%
									</TableCell>
									<TableCell align="center">
										<IconButton aria-label="edit">
											<NavLink to={"/task/editTask/" + task.taskId}>
												{<Edit color="warning"></Edit>}
											</NavLink>{" "}
										</IconButton>
									</TableCell>
									<TableCell align="center">
										<IconButton
											aria-label="delete"
											onClick={() => onDeleteTask(task.taskId)}
										>
											<DeleteIcon color="error" />
										</IconButton>{" "}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}
