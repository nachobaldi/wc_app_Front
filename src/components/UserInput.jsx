import {
	FormControl,
	FormLabel,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { Button } from "@mui/material";

export default function UserInput(props) {
	let user = JSON.parse(localStorage.user);
	let {
		userId,
		firstName,
		lastName,
		password,
		email,
		phoneNum,
		typeId,
		statusId,
		actionName,
		onUserIdChange,
		onFirstNameChange,
		onLastNameChange,
		onPasswordChange,
		onEmailChange,
		onPhoneNumChange,
		onTypeIdChange,
		onStatusIdChange,
		onSubmit,
		onReset,
	} = props;
	let typeOptions = [];
	let StatusOptions = [];

	//set options depends on user type
	if (user.typeId !== 3) {
		StatusOptions = [
			{
				value: 1,
				label: "Active",
			},
			{
				value: 2,
				label: "Not Active",
			},
		];

		typeOptions = [
			{
				value: 1,
				label: "Admin",
			},
			{
				value: 2,
				label: "Mentor",
			},
			{
				value: 3,
				label: "Student",
			},
		];
	} else {
		StatusOptions = [
			{
				value: 1,
				label: "Active",
			},
		];

		typeOptions = [
			{
				value: 3,
				label: "Student",
			},
		];
	}

	return (
		<form>
			<h2>{actionName} User</h2>

			<Grid container alignItems="center" justify="center" direction="column">
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel required>User ID</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="number"
							placeholder="Enter User id"
							value={userId}
							onChange={onUserIdChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel required>First Name</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="text"
							placeholder="Enter First name"
							value={firstName}
							onChange={onFirstNameChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel required>Last Name</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="text"
							placeholder="Enter last name"
							value={lastName}
							onChange={onLastNameChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item hidden={actionName === "Update" ? false : true}>
						<FormLabel>Initial Password</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="text"
							placeholder="Enter Password"
							value={password}
							onChange={onPasswordChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel>Email</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={onEmailChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Grid item>
						<FormLabel>Phone Number</FormLabel>
						<TextField
							sx={{
								backgroundColor: "white",
							}}
							type="tel"
							placeholder="Enter Phone number"
							value={phoneNum}
							onChange={onPhoneNumChange}
						/>
					</Grid>
				</FormControl>
				<FormControl sx={{ m: 1, width: "30ch", mt: 3 }} variant="outlined">
					<TextField
						sx={{
							backgroundColor: "white",
						}}
						id="outlined-select-type"
						select
						label="Type of user"
						value={typeId}
						onChange={onTypeIdChange}
					>
						{typeOptions.map((option) => (
							<MenuItem value={option.value} key={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
				{user.typeId === 3 ? (
					""
				) : (
					<Grid hidden={actionName === "Update" ? false : true}>
						<FormControl sx={{ m: 1, width: "30ch", mt: 3 }} variant="outlined">
							<TextField
								sx={{
									backgroundColor: "white",
								}}
								id="outlined-select-status"
								select
								label="Active | Not active"
								onChange={onStatusIdChange}
								value={statusId}
							>
								{StatusOptions.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
				)}
				<FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
					<Button
						variant="contained"
						color="primary"
						type="submit"
						onClick={onSubmit}
					>
						{actionName}
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
						onClick={onReset}
					>
						Reset
					</Button>
				</FormControl>
			</Grid>
		</form>
	);
}
