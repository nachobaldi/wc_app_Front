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
import LoginContext from "../contexts/LoginContext";
import { Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export default function UsersTable(props) {
	let { users, onDeleteUser } = props;
	let { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
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

	if (!users || users.length === 0) return <h3>No data</h3>;

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell style={{ fontWeight: "bold" }} className="cell">
							User Id
						</StyledTableCell>
						<StyledTableCell
							style={{ fontWeight: "bold" }}
							className="cell"
							align="center"
						>
							First Name
						</StyledTableCell>
						<StyledTableCell
							style={{ fontWeight: "bold" }}
							className="cell"
							align="center"
						>
							Last Name
						</StyledTableCell>
						<StyledTableCell
							style={{ fontWeight: "bold" }}
							className="cell"
							align="center"
						>
							Email
						</StyledTableCell>
						{isLoggedIn && userType === 1 ? (
							<StyledTableCell
								style={{ fontWeight: "bold" }}
								className="cell"
								align="center"
							>
								Password
							</StyledTableCell>
						) : (
							""
						)}
						<StyledTableCell
							style={{ fontWeight: "bold" }}
							className="cell"
							align="center"
						>
							Phone number
						</StyledTableCell>
						<StyledTableCell
							style={{ fontWeight: "bold" }}
							className="cell"
							align="center"
						>
							Status
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
					{users.map((user) => (
						<TableRow
							key={user.userId}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{user.userId}
							</TableCell>
							<TableCell align="center">{user.firstName}</TableCell>
							<TableCell align="center">{user.lastName}</TableCell>
							<TableCell align="center">{user.email}</TableCell>
							{isLoggedIn && userType === 1 ? (
								<TableCell align="center">{user.password}</TableCell>
							) : (
								""
							)}
							<TableCell align="center">{user.phoneNum}</TableCell>
							<TableCell align="center">
								{user.statusId == 1 ? "Active" : "No Active"}
							</TableCell>
							<TableCell align="center">
								<IconButton aria-label="edit">
									<NavLink to={"/user/editUser/" + user.userId}>
										{<Edit color="warning"></Edit>}
									</NavLink>{" "}
								</IconButton>
							</TableCell>
							<TableCell align="center">
								<IconButton
									aria-label="delete"
									onClick={() => onDeleteUser(user.userId)}
								>
									<DeleteIcon color="error" />
								</IconButton>{" "}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
